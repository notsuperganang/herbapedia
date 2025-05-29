// src/app/api/plants/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Plant, { IPlant } from '@/lib/models/Plant';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // TODO: Tambahkan paginasi jika data sangat banyak
    const plants = await Plant.find({}).sort({ name: 1 }); // Urutkan berdasarkan nama
    return NextResponse.json({ success: true, data: plants }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const body: Partial<IPlant> = await req.json();

    // Validasi dasar, bisa diperluas
    if (!body.name || !body.latinName || !body.slug) {
        return NextResponse.json({ success: false, error: 'Missing required fields: name, latinName, slug' }, { status: 400 });
    }

    // Cek duplikasi slug atau latinName
    const existingPlantBySlug = await Plant.findOne({ slug: body.slug });
    if (existingPlantBySlug) {
        return NextResponse.json({ success: false, error: `Plant with slug "${body.slug}" already exists.` }, { status: 409 });
    }
    const existingPlantByLatinName = await Plant.findOne({ latinName: body.latinName });
    if (existingPlantByLatinName) {
        return NextResponse.json({ success: false, error: `Plant with latin name "${body.latinName}" already exists.` }, { status: 409 });
    }

    const plant = await Plant.create(body); // Membuat dokumen baru
    return NextResponse.json({ success: true, data: plant }, { status: 201 });
  } catch (error: any) {
    // Tangani error validasi dari Mongoose atau error lainnya
    if (error.name === 'ValidationError') {
        let errors: { [key: string]: string } = {};
        for (let field in error.errors) {
            errors[field] = error.errors[field].message;
        }
        return NextResponse.json({ success: false, error: "Validation Error", errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 400 });
  }
}