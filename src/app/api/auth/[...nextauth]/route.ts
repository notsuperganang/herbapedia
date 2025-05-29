import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect'; //
import User, { IUser } from '@/lib/models/User'; //

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'adminuser' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error('Please enter username and password');
        }

        await dbConnect(); //

        const user = await User.findOne({
          username: credentials.username.toLowerCase(),
        }).select('+password'); // Pastikan mengambil field password

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error('Invalid credentials');
        }
        
        // Hanya izinkan admin untuk login ke area ini
        if (user.role !== 'admin') {
            throw new Error('Access Denied: Not an admin');
        }

        // Return object yang akan disimpan di token JWT
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email, // jika ada
          role: user.role,
        } as NextAuthUser; // Cast ke NextAuthUser atau type yang sesuai
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Saat sign-in awal, 'user' object akan tersedia
      if (user) {
        token.id = user.id;
        token.role = (user as IUser).role; // Pastikan role ada di tipe user
        token.username = (user as IUser).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as ('admin' | 'user');
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login', // Halaman login kustom kita
    error: '/admin/login', // Redirect ke login jika ada error autentikasi
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret untuk JWT
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };