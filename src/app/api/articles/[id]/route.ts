    // src/app/api/articles/[id]/route.ts
    import { NextRequest, NextResponse } from 'next/server';
    import dbConnect from '@/lib/dbConnect';
    import Article from '@/lib/models/Article'; // Pastikan path ini benar
    import { getToken } from 'next-auth/jwt';
    import mongoose from 'mongoose';

    interface Params {
      id: string;
    }

    export async function GET(req: NextRequest, { params }: { params: Params }) {
      const { id } = params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, error: 'Invalid article ID format' }, { status: 400 });
      }
      
      await dbConnect();

      try {
        const article = await Article.findById(id);
        if (!article) {
          return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: article }, { status: 200 });
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
        return NextResponse.json({ success: false, error: 'Invalid article ID format' }, { status: 400 });
      }

      await dbConnect();

      try {
        const body = await req.json();

        if (body.slug) {
            const existingArticleBySlug = await Article.findOne({ slug: body.slug, _id: { $ne: id } });
            if (existingArticleBySlug) {
                return NextResponse.json({ success: false, error: `Article with slug "${body.slug}" already exists.` }, { status: 409 });
            }
        }
        
        // Pastikan 'date' adalah objek Date yang valid jika dikirim
        if (body.date && typeof body.date === 'string') {
            body.date = new Date(body.date);
        }


        const article = await Article.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        if (!article) {
          return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: article }, { status: 200 });
      } catch (error: any) {
         if (error.name === 'ValidationError') {
            let errors: { [key: string]: string } = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return NextResponse.json({ success: false, error: "Validation Error", errors }, { status: 400 });
        }
        console.error("Error updating article:", error);
        return NextResponse.json({ success: false, error: error.message || 'Server error updating article' }, { status: 400 });
      }
    }

    export async function DELETE(req: NextRequest, { params }: { params: Params }) {
      const { id } = params;
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

      if (!token || token.role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, error: 'Invalid article ID format' }, { status: 400 });
      }

      await dbConnect();

      try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
          return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }
        // TODO: Hapus gambar terkait dari penyimpanan jika ada
        return NextResponse.json({ success: true, data: {} }, { status: 200 });
      } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
    }
    