// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article, { IArticle } from '@/lib/models/Article'; // Pastikan path ini benar
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  // Tidak perlu token untuk GET semua artikel jika ini untuk tampilan publik juga,
  // Namun, jika ini hanya untuk admin, Anda bisa menambahkan pengecekan token di sini.
  // Untuk saat ini, kita biarkan publik agar bisa digunakan di halaman artikel utama.
  await dbConnect();

  try {
    // TODO: Pertimbangkan paginasi jika artikel sangat banyak
    const articles = await Article.find({}).sort({ date: -1 }); // Urutkan berdasarkan tanggal terbaru
    return NextResponse.json({ success: true, data: articles }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin access required' }, { status: 401 });
  }

  await dbConnect();

  try {
    const body: Partial<IArticle> = await req.json();
    
    // Validasi field yang wajib ada
    if (!body.title || !body.slug || !body.content || !body.category || !body.author || !body.image) {
        // Menambahkan image ke field wajib
        return NextResponse.json({ 
            success: false, 
            error: 'Missing required fields: title, slug, content, category, author, image' 
        }, { status: 400 });
    }

    // Cek duplikasi slug
    const existingArticleBySlug = await Article.findOne({ slug: body.slug });
    if (existingArticleBySlug) {
        return NextResponse.json({ success: false, error: `Article with slug "${body.slug}" already exists.` }, { status: 409 }); // 409 Conflict
    }

    // Pastikan 'date' adalah objek Date yang valid jika dikirim, atau default ke Date.now
    // Jika body.date dikirim sebagai string (misalnya dari input type="date"), konversi ke Date
    if (body.date && typeof body.date === 'string') {
        const parsedDate = new Date(body.date);
        // Cek apakah hasil parse valid
        if (isNaN(parsedDate.getTime())) {
             return NextResponse.json({ success: false, error: 'Invalid date format for article date.' }, { status: 400 });
        }
        body.date = parsedDate;
    } else if (!body.date) { // Jika tidak ada tanggal, default ke sekarang
        body.date = new Date();
    }


    const newArticle = await Article.create(body);
    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
        let errors: { [key: string]: string } = {};
        for (let field in error.errors) {
            errors[field] = error.errors[field].message;
        }
        return NextResponse.json({ success: false, error: "Validation Error", errors }, { status: 400 });
    }
    console.error("Error creating article:", error);
    return NextResponse.json({ success: false, error: error.message || 'Server error creating article' }, { status: 500 });
  }
}
