// scripts/createAdminUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Ganti dengan string koneksi MongoDB dan model User
const MONGODB_URI = 'mongodb+srv://herbapedia_admin_user:admin@herbapediacluster.sliwsnk.mongodb.net/herbapedia_db?retryWrites=true&w=majority&appName=HerbapediaCluster';

// Skema User Sederhana (sesuaikan dengan yang ada di src/lib/models/User.ts)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'admin' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    rl.question('Enter admin username: ', async (username) => {
      rl.question('Enter admin password: ', async (password) => {
        if (!username || !password) {
          console.error('Username and password are required.');
          rl.close();
          await mongoose.disconnect();
          return;
        }

        const existingUser = await User.findOne({ username: username.toLowerCase() });
        if (existingUser) {
          console.error(`User with username "${username}" already exists.`);
          rl.close();
          await mongoose.disconnect();
          return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const adminUser = new User({
          username: username.toLowerCase(),
          password: hashedPassword,
          role: 'admin',
        });

        await adminUser.save();
        console.log('Admin user created successfully!');
        
        rl.close();
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
      });
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

createAdmin();