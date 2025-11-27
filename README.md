🛍️ Next Gadget - Modern Tech E-commerce Platform

Next Gadget is a full-stack e-commerce web application built to demonstrate the power of Next.js 16 (App Router). It features a sleek, glassmorphism-inspired UI, secure authentication, dynamic product management, and a seamless user experience optimized for all devices.

🚀 Live Demo

Check out the live application deployed on Vercel:
👉 https://next-gadget-shop.vercel.app/

✨ Key Features

🎨 Modern UI/UX

Glassmorphism Design: Beautiful, translucent UI elements using Tailwind CSS.

Animations: Smooth transitions and interactions powered by Framer Motion.

Responsive: Fully adaptive layout for Mobile, Tablet, and Desktop.

Dark/Light Mode: Seamless theme switching with persistent state.

Shadcn UI: Accessible and customizable component library.

🔐 Authentication & Security

Secure Login: Supported via Google OAuth and Credentials (Email/Password).

Registration: Custom registration flow with Image Upload support.

Protected Routes: Dashboard and management pages are secured via NextAuth.js.

Password Hashing: Secure handling of user credentials.

📦 Product Management (CRUD)

Browse Products: Filterable and searchable product grid.

Product Details: Rich product pages with galleries and specifications.

Admin Dashboard:

Add Product: Create new listings with details and images.

Edit Product: Update existing product information.

Delete Product: Remove outdated listings.

Image Hosting: Integration with ImgBB API for efficient image storage.

🛠️ Tech Stack

Frontend:

Next.js 16 (App Router, Server Components)

React 19

Tailwind CSS v4

Shadcn UI (Radix UI based components)

Framer Motion (Animations)

Lucide React (Icons)

Swiper.js (Carousels)

Backend & Database:

Next.js API Routes (Serverless Functions)

MongoDB (Database)

Mongoose / Native Driver (ODM)

NextAuth.js (Authentication)

Tools & Services:

ImgBB: Image Hosting API

Vercel: Deployment & Hosting

SweetAlert2: Modern popup alerts

⚙️ Installation & Setup

Follow these steps to run the project locally.

1. Clone the Repository

git clone [https://github.com/hadialhamza/gadget-shop.git](https://github.com/hadialhamza/gadget-shop.git)
cd gadget-shop

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env.local file in the root directory and add the following variables:

# Database Connection

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gadget-shop

# NextAuth Configuration

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_here

# Google OAuth (Optional for Google Login)

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image Upload Service (ImgBB)

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

4. Run the Development Server

npm run dev

Open http://localhost:3000 with your browser to see the result.

📂 Project Structure

├── src/
│ ├── app/ # Next.js App Router (Pages & API)
│ │ ├── api/ # Backend API Routes
│ │ ├── dashboard/ # Protected Admin Routes
│ │ ├── login/ # Auth Pages
│ │ ├── products/ # Public Product Pages
│ │ ├── layout.js # Root Layout
│ │ └── page.js # Landing Page
│ ├── components/ # Reusable React Components
│ │ ├── home/ # Landing Page Specific Components
│ │ └── ui/ # Shadcn UI Components
│ ├── lib/ # Utility functions & DB connection
│ └── utils/ # Helper scripts
├── public/ # Static assets
├── .env.local # Environment variables
└── package.json # Project dependencies

🔌 API Endpoints

The application exposes the following internal APIs:

Method

Endpoint

Description

GET

/api/products

Fetch all products

POST

/api/products

Create a new product (Auth required)

GET

/api/products/:id

Get details of a single product

PUT

/api/products/:id

Update a product (Auth required)

DELETE

/api/products/:id

Delete a product (Auth required)

POST

/api/register

Register a new user

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

👨‍💻 Author

Hadi Al Hamza

GitHub: @hadialhamza

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
