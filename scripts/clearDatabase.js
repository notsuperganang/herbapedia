// scripts/clearDatabase.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const path = require('path');

async function clearDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Define schemas directly
    const plantSchema = new mongoose.Schema({
      name: { type: String, required: true },
      latinName: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      benefits: [{ type: String, required: true }],
      uses: { type: String, required: true },
      region: { type: String, required: true },
      parts: [{ type: String, required: true }],
      habitat: { type: String, required: true },
      cultivation: { type: String, required: true },
      history: { type: String, required: true },
      image: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      scientificClassification: {
        kingdom: { type: String, required: true },
        division: { type: String },
        class: { type: String },
        order: { type: String, required: true },
        family: { type: String, required: true },
        genus: { type: String, required: true },
        species: { type: String, required: true }
      },
      relatedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }]
    }, { timestamps: true });

    const articleSchema = new mongoose.Schema({
      title: { type: String, required: true },
      excerpt: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String, required: true },
      author: { type: String, required: true },
      date: { type: Date, required: true, default: Date.now },
      slug: { type: String, required: true, unique: true },
      category: { type: String, required: true },
      readTime: { type: String }
    }, { timestamps: true });

    // Create models
    const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
    const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

    // Clear Plants collection
    console.log('Clearing plants collection...');
    const deletedPlants = await Plant.deleteMany({});
    console.log(`Deleted ${deletedPlants.deletedCount} plants`);

    // Clear Articles collection
    console.log('Clearing articles collection...');
    const deletedArticles = await Article.deleteMany({});
    console.log(`Deleted ${deletedArticles.deletedCount} articles`);

    console.log('Database cleared successfully!');
    
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  }
}

// Run the script
clearDatabase();