import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadImages = async () => {
  try {
    console.log('🚀 Starting image upload to Cloudinary...\n');

    const imagesToUpload = [
      {
        name: 'nikeJacket',
        path: '../../frontend/src/images/nikeJacket.avif',
        folder: 'pulsepoint/products'
      },
      {
        name: 'fleeceSweater',
        path: '../../frontend/src/images/fleeceSweater.jpeg',
        folder: 'pulsepoint/products'
      },
      {
        name: 'rockClimbingShoes',
        path: '../../frontend/src/images/rockClimbingShoes.webp',
        folder: 'pulsepoint/products'
      },
      {
        name: 'compressionPants',
        path: '../../frontend/src/images/compressionPants.webp',
        folder: 'pulsepoint/products'
      },
      {
        name: 'compressionShirt',
        path: '../../frontend/src/images/compressionShirt.jpg',
        folder: 'pulsepoint/products'
      },
      {
        name: 'adidasRunningShoes',
        path: '../../frontend/src/images/runningShoes.jpg',
        folder: 'pulsepoint/products'
      },
      {
        name: 'canadaGooseJacket',
        path: '../../frontend/src/images/newArrivals/newJacket.webp',
        folder: 'pulsepoint/new-arrivals'
      },
      {
        name: 'noBoundariesLeggings',
        path: '../../frontend/src/images/newArrivals/newLeggings.webp',
        folder: 'pulsepoint/new-arrivals'
      },
      {
        name: 'avalanteSweater',
        path: '../../frontend/src/images/newArrivals/newSweater.jpg',
        folder: 'pulsepoint/new-arrivals'
      }
    ];

    const uploadedUrls = {};

    for (const image of imagesToUpload) {
      const fullPath = path.resolve(__dirname, image.path);
      
      console.log(`📤 Uploading ${image.name}...`);
      
      const result = await cloudinary.v2.uploader.upload(fullPath, {
        folder: image.folder,
        public_id: image.name,
        resource_type: 'auto'
      });

      uploadedUrls[image.name] = result.secure_url;
      console.log(`✅ Uploaded: ${result.secure_url}\n`);
    }

    console.log('\n🎉 All images uploaded successfully!\n');
    console.log('Copy these URLs for your seed script:\n');
    console.log(JSON.stringify(uploadedUrls, null, 2));

    return uploadedUrls;
  } catch (error) {
    console.error('❌ Error uploading images:', error);
  }
};

uploadImages();