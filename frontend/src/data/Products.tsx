import nikeJacket from '../images/nikeJacket.avif';
import fleeceSweater from '../images/fleeceSweater.jpeg';
import rockClimbingShoes from '../images/rockClimbingShoes.webp';
import compressionPants from '../images/compressionPants.webp';
import compressionShirt from '../images/compressionShirt.jpg';
import adidasRunningShoes from '../images/runningShoes.jpg';

import newJacket from '../images/newArrivals/newJacket.webp';
import newLeggings from '../images/newArrivals/newLeggings.webp';
import newSweater from '../images/newArrivals/newSweater.jpg';

const Products = [
  {
    id: 1,
    title: 'Nike Jacket',
    gender: 'Men',
    category: 'Jackets',
    price: 119.99,
    size: 'XL',
    alt: "Premium Nike men's athletic jacket in black",
    src: nikeJacket,
    description:
      'This retro-inspired jacket channels the clean, cool look of Club. Its lightweight nylon build feels roomy through the body for easy movement and layering.',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Rock Climbing Shoes',
    gender: 'Men',
    category: 'Accessories',
    price: 59.99,
    size: 'M',
    alt: "Specialized men's rock climbing shoes with rubber grip soles",
    src: rockClimbingShoes,
    description:
      "The Summit Grip Pro climbing shoes deliver superior traction on vertical surfaces. Featuring high-friction rubber soles and a precision fit design that conforms to your foot's natural shape for enhanced control on challenging routes.",
    rating: 5,
  },
  {
    id: 3,
    title: 'Compression Pants',
    gender: 'Men',
    category: 'Pants',
    price: 39.99,
    size: 'XS',
    alt: "Men's athletic compression pants for enhanced performance",
    src: compressionPants,
    description:
      'The Power Stride compression pants provide targeted muscle support and improved circulation during high-intensity workouts. Four-way stretch fabric moves with your body while moisture-wicking technology keeps you dry and comfortable.',
    rating: 4.75,
  },
  {
    id: 4,
    title: 'Fleece Sweater',
    gender: 'Women',
    category: 'Sweaters',
    price: 35.99,
    size: 'M',
    alt: "Women's cozy fleece sweater for cold weather activities",
    src: fleeceSweater,
    description:
      'The Alpine Warmth fleece sweater combines ultimate softness with functional performance. Brushed interior traps heat while the lightweight construction allows for easy layering, making it perfect for cold-weather adventures or everyday comfort.',
    rating: 3.5,
  },
  {
    id: 5,
    title: 'Compression Shirt',
    gender: 'Men',
    category: 'Shirts',
    price: 9.99,
    size: 'L',
    alt: "Men's athletic compression shirt for training and recovery",
    src: compressionShirt,
    description:
      'The Recovery Tech compression shirt enhances performance and speeds muscle recovery. Engineered with seamless construction and strategic ventilation zones, this second-skin fit shirt provides support during training while helping reduce fatigue.',
    rating: 4.25,
  },
  {
    id: 6,
    title: 'Adidas Running Shoes',
    gender: 'Women',
    category: 'Accessories',
    price: 49.99,
    size: 'S',
    alt: "Women's Adidas  running shoes with cushioned soles",
    src: adidasRunningShoes,
    description:
      "The Cloud Boost running shoes deliver responsive cushioning and energy return with every stride. Featuring Adidas' signature midsole technology and breathable mesh upper, these lightweight trainers provide both comfort and performance for your daily runs.",
    rating: 5,
  },
  {
    id: 7,
    title: 'Canada Goose Jacket',
    gender: 'Women',
    category: 'Jackets',
    price: 895.95,
    size: 'XS-XL',
    alt: "Women's Canada Goose in black",
    src: newJacket,
    description:
      'Premium down-filled winter parka designed to withstand extreme temperatures. Features adjustable hood with real coyote fur trim, multiple exterior and interior pockets, and a durable water-resistant shell.',
    rating: 4.8,
  },
  {
    id: 8,
    title: 'No Boundaries Leggings',
    gender: 'Women',
    category: 'Pants',
    price: 39.99,
    size: 'XS-XXL',
    alt: "Women's No Boundaries high-waisted yoga leggings",
    src: newLeggings,
    description:
      'High-performance, four-way stretch leggings with moisture-wicking technology. Features a high waistband with hidden pocket, seamless design for maximum comfort, and squat-proof fabric that moves with you throughout your workout.',
    rating: 4.5,
  },
  {
    id: 9,
    title: 'Avalante Sweater',
    gender: 'Men',
    category: 'Sweaters',
    price: 129.99,
    size: 'S-XXL',
    alt: "Men's Avalante wool-blend knit sweater in heather gray",
    src: newSweater,
    description:
      'Premium wool-blend cable knit sweater featuring a classic design with modern detailing. This versatile piece offers exceptional warmth and comfort with a tailored fit that transitions seamlessly from office to evening wear.',
    rating: 4.7,
  },
];

export default Products;
