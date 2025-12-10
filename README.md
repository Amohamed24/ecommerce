# 🛍️ PulsePoint

A Full Stack eCommerce platform with user authentication, shopping cart management, and real-time inventory. Built with React, TypeScript, Node.js, and MongoDB.

🔗 **[Live Demo](https://ecommerce-mohamed-ahmeds-projects-dc30db48.vercel.app)** 

<img width="1440" height="786" alt="Screenshot 2025-12-10 at 10 13 27 AM" src="https://github.com/user-attachments/assets/f50ca89a-9c60-404b-a965-17a52a0087a8" />

## ⚡ Quick Start
```bash
# Clone and install
git clone https://github.com/yourusername/pulsepoint.git
cd pulsepoint

# Backend setup
cd backend && npm install
cp .env.example .env  # Add your MongoDB URI, JWT secret
npm run dev

# Frontend setup (new terminal)
cd frontend && npm install
npm run dev
```

Visit `http://localhost:5173` - Test account: `test@pulsepoint.com` / `testpass123`

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, Vite  
**Backend:** Node.js, Express, MongoDB, JWT  
**Infrastructure:** Cloudinary (images), Vercel (hosting)

## ✨ Features

- 🔐 JWT authentication with secure password hashing
- 🛒 Full shopping cart with persistence & server sync
- 🔍 Product search and filtering by category/price
- 💳 Two-step checkout with address management
- 📱 Fully responsive design
- ☁️ Cloud-hosted images via Cloudinary CDN

## 📂 Project Structure
```
pulsepoint/
├── frontend/          # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/api.ts
│   └── package.json
└── backend/           # Express + MongoDB
    ├── models/
    ├── routes/
    ├── controllers/
    └── server.js
```

## 🌐 API Endpoints
```
POST   /api/user              Register
POST   /api/user/login        Login
GET    /api/product/list      Get products
POST   /api/user/add-to-cart  Add to cart
DELETE /api/user/remove-from-cart/:id
```

## 🚀 Deployment

- Frontend & Backend deployed on Vercel
- Database hosted on MongoDB Atlas
- Images served via Cloudinary CDN

## 👤 Author

**Mohamed Ahmed**  
[GitHub](https://github.com/Amohamed24) • [LinkedIn](https://linkedin.com/in/yourprofile](https://www.linkedin.com/in/mohamed-ahmed-0998041b3/))

---

⭐ Star this repo if you found it helpful!
