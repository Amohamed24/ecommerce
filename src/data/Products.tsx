import nikeJacket from "../images/nikeJacket.avif"
import fleeceSweater from "../images/fleeceSweater.jpeg"
import rockClimbingShoes from "../images/rockClimbingShoes.webp"
import compressionPants from "../images/compressionPants.webp"
import compressionShirt from "../images/compressionShirt.jpg"
import adidasRunningShoes from "../images/runningShoes.jpg"

const Products = [
    {
        id: 1,
        title: "Nike Jacket",
        gender: "Men",
        category: "Jacket",
        price: "$120",
        size: "XL",
        alt: "Premium Nike men's athletic jacket in black",
        src: nikeJacket,
    },
    {
        id: 2,
        title: "Rock Climbing Shoes",
        gender: "Men",
        category: "Shoes",
        price: "$60",
        size: "M",
        alt: "Specialized men's rock climbing shoes with rubber grip soles",
        src: rockClimbingShoes,
    },
    {   
        id: 3,
        title: "Compression Pants",
        gender: "Men",
        category: "Pants",
        price: "$40",
        size: "XS",
        alt: "Men's athletic compression pants for enhanced performance",
        src: compressionPants,
    },
    {   
        id: 4,
        title: "Fleece Sweater",
        gender: "Women",
        category: "Sweater",
        price: "$35",
        size: "M",
        alt: "Women's cozy fleece sweater for cold weather activities",
        src: fleeceSweater,
    },
    {   
        id: 5,
        title: "Compression Shirt",
        gender: "Men",
        category: "Shirt",
        price: "$10",
        size: "L",
        alt: "Men's athletic compression shirt for training and recovery",
        src: compressionShirt,
    },
    {   
        id: 6,
        title: "Adidas Running Shoes",
        gender: "Women",
        category: "Shoes",
        price: "$50",
        size: "S",
        alt: "Women's Adidas performance running shoes with cushioned soles",
        src: adidasRunningShoes,
    },
]

export default Products;