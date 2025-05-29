import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email?: string; // Opsional, bisa pakai username saja untuk login
  password: string;
  role: 'admin' | 'user'; // Untuk membedakan peran
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      // unique: true, // Aktifkan jika email wajib dan unik
      // sparse: true, // Izinkan null/undefined untuk unique index jika email opsional
      trim: true,
      lowercase: true,
      // match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Agar password tidak dikembalikan secara default saat query
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;