import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Interface untuk ScientificClassification
export interface IScientificClassification {
  kingdom: string;
  division?: string; // Opsional karena tidak semua klasifikasi punya ini
  class?: string;    // Opsional
  order: string;
  family: string;
  genus: string;
  species: string;
}

// Interface utama untuk dokumen Tanaman
export interface IPlant extends Document {
  name: string;
  latinName: string;
  description: string;
  benefits: string[];
  uses: string;
  region: string;
  parts: string[];
  habitat: string;
  cultivation: string;
  history: string;
  image: string; // URL atau path ke gambar
  slug: string;
  scientificClassification: IScientificClassification;
  relatedPlants?: mongoose.Types.ObjectId[]; // Referensi ke tanaman lain
  createdAt?: Date;
  updatedAt?: Date;
}

const ScientificClassificationSchema: Schema<IScientificClassification> = new Schema({
  kingdom: { type: String, required: true },
  division: { type: String },
  class: { type: String },
  order: { type: String, required: true },
  family: { type: String, required: true },
  genus: { type: String, required: true },
  species: { type: String, required: true },
});

const PlantSchema: Schema<IPlant> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    latinName: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true },
    benefits: [{ type: String, required: true }],
    uses: { type: String, required: true },
    region: { type: String, required: true },
    parts: [{ type: String, required: true }],
    habitat: { type: String, required: true },
    cultivation: { type: String, required: true },
    history: { type: String, required: true },
    image: { type: String, required: true }, // Simpan URL gambar
    slug: { type: String, required: true, unique: true, trim: true },
    scientificClassification: { type: ScientificClassificationSchema, required: true },
    relatedPlants: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  }
);

// Indeks untuk pencarian yang lebih cepat berdasarkan nama dan slug
PlantSchema.index({ name: 'text', latinName: 'text', slug: 1 });

// Mencegah Mongoose mengompilasi ulang model jika sudah ada
const Plant: Model<IPlant> = models.Plant || mongoose.model<IPlant>('Plant', PlantSchema);

export default Plant;