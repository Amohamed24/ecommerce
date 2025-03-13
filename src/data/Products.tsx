import nikeJacket from '../images/nikeJacket.avif';
import fleeceSweater from '../images/fleeceSweater.jpeg';
import rockClimbingShoes from '../images/rockClimbingShoes.webp';
import compressionPants from '../images/compressionPants.webp';
import compressionShirt from '../images/compressionShirt.jpg';
import adidasRunningShoes from '../images/runningShoes.jpg';

const Products = [
  {
    id: 1,
    title: 'Nike Jacket',
    gender: 'Men',
    category: 'Jacket',
    price: 120,
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
    category: 'Shoes',
    price: 60,
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
    price: 40,
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
    category: 'Sweater',
    price: 35,
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
    category: 'Shirt',
    price: 10,
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
    category: 'Shoes',
    price: 50,
    size: 'S',
    alt: "Women's Adidas  running shoes with cushioned soles",
    src: adidasRunningShoes,
    description:
      "The Cloud Boost running shoes deliver responsive cushioning and energy return with every stride. Featuring Adidas' signature midsole technology and breathable mesh upper, these lightweight trainers provide both comfort and performance for your daily runs.",
    rating: 5,
  },
];

export default Products;
