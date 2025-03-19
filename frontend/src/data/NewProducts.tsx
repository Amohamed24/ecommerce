import newJacket from "../images/newArrivals/newJacket.webp"
import newLeggings from "../images/newArrivals/newLeggings.webp"
import newShoes from "../images/newArrivals/newShoes.webp"
import newSweater from "../images/newArrivals/newSweater.jpg"

const NewProducts = [
  {
    id: 1,
    title: 'Canada Goose Jacket',
    gender: 'Women',
    category: 'Jackets',
    price: 895.00,
    size: 'XS-XL',
    alt: "Women's Canada Goose in black",
    src: newJacket,
    description:
      'Premium down-filled winter parka designed to withstand extreme temperatures. Features adjustable hood with real coyote fur trim, multiple exterior and interior pockets, and a durable water-resistant shell.',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'No Boundaries Leggings',
    gender: 'Women',
    category: 'Pants',
    price: 39.99,
    size: 'XS-XXL',
    alt: "Women's No Boundaries high-waisted yoga leggings",
    src: newLeggings,
    description:
      "High-performance, four-way stretch leggings with moisture-wicking technology. Features a high waistband with hidden pocket, seamless design for maximum comfort, and squat-proof fabric that moves with you throughout your workout.",
    rating: 4.5,
  },
  // {
  //   id: 3,
  //   title: 'New Balance 609v5',
  //   gender: 'Women',
  //   category: 'Shoes',
  //   price: 79.99,
  //   size: '5-11',
  //   alt: "Women's New Balance 609v5 training shoes in white and teal",
  //   src: newShoes,
  //   description:
  //     'Versatile training shoes featuring ABZORB cushioning technology for superior impact absorption. Durable leather upper provides stability, while the rubber outsole offers excellent traction for various workout environments.',
  //   rating: 4.6,
  // },
  {
    id: 4,
    title: 'Avalante Sweater',
    gender: 'Men',
    category: 'Sweaters',
    price: 129.50,
    size: 'S-XXL',
    alt: "Men's Avalante wool-blend knit sweater in heather gray",
    src: newSweater,
    description:
      'Premium wool-blend cable knit sweater featuring a classic design with modern detailing. This versatile piece offers exceptional warmth and comfort with a tailored fit that transitions seamlessly from office to evening wear.',
    rating: 4.7,
  },
];

export default NewProducts;