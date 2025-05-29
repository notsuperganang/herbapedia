// src/app/api/plants/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Plant from '@/lib/models/Plant';
import { getToken } from 'next-auth/jwt';
import mongoose from 'mongoose';

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: 'Invalid plant ID format' }, { status: 400 });
  }

  await dbConnect();

  try {
    const plant = await Plant.findById(id).populate('relatedPlants', 'name slug'); // Populate jika ada relasi
    if (!plant) {
      return NextResponse.json({ success: false, error: 'Plant not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: plant }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: 'Invalid plant ID format' }, { status: 400 });
  }

  await dbConnect();

  try {
    const body = await req.json();

    // Cek duplikasi slug atau latinName jika diubah dan tidak sama dengan ID saat ini
    if (body.slug) {
        const existingPlantBySlug = await Plant.findOne({ slug: body.slug, _id: { $ne: id } });
        if (existingPlantBySlug) {
            return NextResponse.json({ success: false, error: `Plant with slug "${body.slug}" already exists.` }, { status: 409 });
        }
    }
    if (body.latinName) {
        const existingPlantByLatinName = await Plant.findOne({ latinName: body.latinName, _id: { $ne: id } });
        if (existingPlantByLatinName) {
            return NextResponse.json({ success: false, error: `Plant with latin name "${body.latinName}" already exists.` }, { status: 409 });
        }
    }

    const plant = await Plant.findByIdAndUpdate(id, body, {
      new: true, // Mengembalikan dokumen yang sudah diperbarui
      runValidators: true, // Menjalankan validator Mongoose saat update
    });

    if (!plant) {
      return NextResponse.json({ success: false, error: 'Plant not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: plant }, { status: 200 });
  } catch (error: any) {
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

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, error: 'Invalid plant ID format' }, { status: 400 });
  }

  await dbConnect();

  try {
    const deletedPlant = await Plant.findByIdAndDelete(id);
    if (!deletedPlant) {
      return NextResponse.json({ success: false, error: 'Plant not found' }, { status: 404 });
    }
    // TODO: Hapus gambar terkait dari penyimpanan jika ada
    return NextResponse.json({ success: true, data: {} }, { status: 200 }); // Berhasil dihapus
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}