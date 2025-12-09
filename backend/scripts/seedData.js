import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: { type: Object, default: {} },
});

const productSchema = new mongoose.Schema({
  title: String,
  gender: String,
  category: String,
  price: Number,
  size: String,
  alt: String,
  image: [String],
  description: String,
  rating: Number,
  bestseller: { type: Boolean, default: false },
  date: { type: Number, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create test user
    const hashedPassword = await bcrypt.hash('testpass123', 10);
    await User.create({
      name: 'Test User',
      email: 'test@pulsepoint.com',
      password: hashedPassword,
      cartData: {},
    });
    console.log('👤 Created test user');

    const products = [
      {
        title: 'Nike Jacket',
        gender: 'Men',
        category: 'Jackets',
        price: 119.99,
        size: 'XL',
        alt: "Premium Nike men's athletic jacket in black",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313698/pulsepoint/products/nikeJacket.avif',
        ],
        description:
          'This retro-inspired jacket channels the clean, cool look of Club. Its lightweight nylon build feels roomy through the body for easy movement and layering.',
        rating: 4.5,
        bestseller: true,
      },
      {
        title: 'Rock Climbing Shoes',
        gender: 'Men',
        category: 'Accessories',
        price: 59.99,
        size: 'M',
        alt: "Specialized men's rock climbing shoes with rubber grip soles",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313700/pulsepoint/products/rockClimbingShoes.webp',
        ],
        description:
          "The Summit Grip Pro climbing shoes deliver superior traction on vertical surfaces. Featuring high-friction rubber soles and a precision fit design that conforms to your foot's natural shape for enhanced control on challenging routes.",
        rating: 5,
        bestseller: false,
      },
      {
        title: 'Compression Pants',
        gender: 'Men',
        category: 'Pants',
        price: 39.99,
        size: 'XS',
        alt: "Men's athletic compression pants for enhanced performance",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313700/pulsepoint/products/compressionPants.webp',
        ],
        description:
          'The Power Stride compression pants provide targeted muscle support and improved circulation during high-intensity workouts. Four-way stretch fabric moves with your body while moisture-wicking technology keeps you dry and comfortable.',
        rating: 4.75,
        bestseller: false,
      },
      {
        title: 'Fleece Sweater',
        gender: 'Women',
        category: 'Sweaters',
        price: 35.99,
        size: 'M',
        alt: "Women's cozy fleece sweater for cold weather activities",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313698/pulsepoint/products/fleeceSweater.jpg',
        ],
        description:
          'The Alpine Warmth fleece sweater combines ultimate softness with functional performance. Brushed interior traps heat while the lightweight construction allows for easy layering, making it perfect for cold-weather adventures or everyday comfort.',
        rating: 3.5,
        bestseller: false,
      },
      {
        title: 'Compression Shirt',
        gender: 'Men',
        category: 'Shirts',
        price: 9.99,
        size: 'L',
        alt: "Men's athletic compression shirt for training and recovery",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313701/pulsepoint/products/compressionShirt.jpg',
        ],
        description:
          'The Recovery Tech compression shirt enhances performance and speeds muscle recovery. Engineered with seamless construction and strategic ventilation zones, this second-skin fit shirt provides support during training while helping reduce fatigue.',
        rating: 4.25,
        bestseller: false,
      },
      {
        title: 'Adidas Running Shoes',
        gender: 'Women',
        category: 'Accessories',
        price: 49.99,
        size: 'S',
        alt: "Women's Adidas running shoes with cushioned soles",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313702/pulsepoint/products/adidasRunningShoes.jpg',
        ],
        description:
          "The Cloud Boost running shoes deliver responsive cushioning and energy return with every stride. Featuring Adidas' signature midsole technology and breathable mesh upper, these lightweight trainers provide both comfort and performance for your daily runs.",
        rating: 5,
        bestseller: true,
      },
      {
        title: 'Canada Goose Jacket',
        gender: 'Women',
        category: 'Jackets',
        price: 895.0,
        size: 'XS-XL',
        alt: "Women's Canada Goose in black",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313703/pulsepoint/new-arrivals/canadaGooseJacket.webp',
        ],
        description:
          'Premium down-filled winter parka designed to withstand extreme temperatures. Features adjustable hood with real coyote fur trim, multiple exterior and interior pockets, and a durable water-resistant shell.',
        rating: 4.8,
        bestseller: true,
      },
      {
        title: 'No Boundaries Leggings',
        gender: 'Women',
        category: 'Pants',
        price: 39.99,
        size: 'XS-XXL',
        alt: "Women's No Boundaries high-waisted yoga leggings",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313704/pulsepoint/new-arrivals/noBoundariesLeggings.webp',
        ],
        description:
          'High-performance, four-way stretch leggings with moisture-wicking technology. Features a high waistband with hidden pocket, seamless design for maximum comfort, and squat-proof fabric that moves with you throughout your workout.',
        rating: 4.5,
        bestseller: false,
      },
      {
        title: 'Avalante Sweater',
        gender: 'Men',
        category: 'Sweaters',
        price: 129.5,
        size: 'S-XXL',
        alt: "Men's Avalante wool-blend knit sweater in heather gray",
        image: [
          'https://res.cloudinary.com/dzz48ot42/image/upload/v1765313705/pulsepoint/new-arrivals/avalanteSweater.jpg',
        ],
        description:
          'Premium wool-blend cable knit sweater featuring a classic design with modern detailing. This versatile piece offers exceptional warmth and comfort with a tailored fit that transitions seamlessly from office to evening wear.',
        rating: 4.7,
        bestseller: true,
      },
    ];

    await Product.insertMany(products);
    console.log(
      `📦 Created ${products.length} products with Cloudinary images`
    );

    console.log('\n✅ DATABASE SEEDED SUCCESSFULLY!\n');
    console.log('═══════════════════════════════════');
    console.log('Test Account Credentials:');
    console.log('Email: test@pulsepoint.com');
    console.log('Password: testpass123');
    console.log('═══════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
