import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  excerpt: string;
  content: string; // Untuk Rich Text Editor, bisa HTML atau JSON
  image: string; // URL atau path ke gambar
  author: string;
  date: Date;
  slug: string;
  category: string;
  readTime?: string; // Misal: "5 menit"
  createdAt?: Date;
  updatedAt?: Date;
}

const ArticleSchema: Schema<IArticle> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    readTime: { type: String },
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  }
);

ArticleSchema.index({ title: 'text', category: 1, slug: 1 });

const Article: Model<IArticle> = models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;