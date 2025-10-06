# 🛒 E-Commerce Shopping Cart

A modern, full-stack e-commerce application built with React, featuring a robust shopping cart, product management, and seamless checkout experience.

![E-commerce Frontend](https://res.cloudinary.com/driaaeuhp/image/upload/v1719924190/myPortfolio/private/laimn7djcwatrzgahhpc.png)

## 🚀 Live Demo

**Frontend:** [https://ecommerce-swart-three-43.vercel.app](https://ecommerce-swart-three-43.vercel.app)  
**API Endpoint:** [https://ecommerce-swart-three-43.vercel.app/api/products](https://ecommerce-swart-three-43.vercel.app/api/products)

## ✨ Features

### 🛍️ Shopping Experience
- **Smart Cart System** - Add/remove items with quantity management
- **Buy Now** - Quick checkout with auto-scroll to cart
- **Product Filtering** - Filter by category (Electronics, Tables, Boots)
- **Advanced Search** - Real-time product search functionality
- **Responsive Design** - Seamless experience across all devices

### 🎨 UI/UX
- Modern, clean interface with Tailwind CSS
- Smooth animations and transitions
- Interactive product cards with image zoom
- Shopping cart badge with item count
- Category-based product organization

### 🔧 Technical Features
- **State Management** - Zustand for efficient state handling
- **API Integration** - RESTful backend with Express.js
- **TypeScript Support** - Type-safe components
- **Serverless Functions** - Vercel serverless API endpoints
- **Docker Support** - Production-ready containerization

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

### DevOps
- **Vercel** - Deployment platform
- **Docker** - Containerization
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/RakeshSingh38/shopping-cart.git
   cd shopping-cart
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Run the development servers**

   Open two terminals:

   **Terminal 1 - Backend:**
   ```bash
   npm run server:dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api/products`

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t ecommerce-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 -p 5000:5000 ecommerce-app
   ```

## 📁 Project Structure

```
E-Commerce-Frontend/
├── api/                    # Vercel serverless functions
│   ├── checkout.js         # Checkout endpoint
│   └── products.js         # Products endpoint
├── server/                 # Express backend
│   ├── data/              
│   │   └── products.json  # Product database (21 items)
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── src/
│   ├── Components/        # React components
│   │   ├── Header.jsx     # Navigation & cart badge
│   │   ├── Shoppingcart.jsx  # Cart & checkout
│   │   ├── Singleproduct.jsx # Product details
│   │   └── ...
│   ├── context/           # State management
│   │   ├── Cart.tsx       # Cart context
│   │   └── Productdata.tsx # Product data context
│   ├── config/
│   │   └── api.js         # API configuration
│   ├── pages/             # Route pages
│   └── types/             # TypeScript types
├── dockerfile             # Docker configuration
├── vercel.json           # Vercel deployment config
└── vite.config.js        # Vite configuration
```

## 🔌 API Endpoints

### GET `/api/products`
Returns all products in the catalog.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 900,
    "category": "electronic",
    "imageUrl": "https://..."
  }
]
```

### POST `/api/checkout`
Process checkout for cart items.

**Request:**
```json
{
  "items": [
    { "id": 1, "quantity": 2 },
    { "id": 2, "quantity": 1 }
  ]
}
```

**Response:**
```json
{
  "message": "Order placed successfully!",
  "orderSummary": {
    "totalItems": 3,
    "totalAmount": 1800
  }
}
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run server:dev       # Start backend dev server

# Production
npm run build           # Build frontend for production
npm run preview         # Preview production build
npm run server:prod     # Start backend in production mode

# Linting
npm run lint            # Run ESLint
```

## 🌟 Key Features Implementation

### Shopping Cart
- Persistent cart state using Zustand
- Add/remove items with quantity control
- Real-time subtotal calculation
- Checkout with cart details logging

### Product Management
- 21 products across 3 categories
- Dynamic product filtering
- Search functionality
- Product detail pages with image viewer

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Smooth animations
- Touch-friendly interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rakesh Singh**

- Website: [iamrakesh.codes](https://shopping-cart.iamrakesh.codes)
- GitHub: [@RakeshSingh38](https://github.com/RakeshSingh38)

---



