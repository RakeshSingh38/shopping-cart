import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// CORS configuration for production
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const productsFilePath = join(__dirname, "data", "products.json");

// Load products data from JSON file
let products = JSON.parse(readFileSync(productsFilePath, "utf-8"));

// Log products on server startup
if (NODE_ENV === "development" || NODE_ENV === "production") {
    console.log("\n" + "=".repeat(60));
    console.log("📦 PRODUCTS DATABASE LOADED");
    console.log("=".repeat(60));
    console.log(`Total Products: ${products.length}`);
    console.log("\nProduct List:");
    products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   - ID: ${product.id}`);
        console.log(`   - Category: ${product.category}`);
        console.log(`   - Price: ₹${product.price}`);
    });
    console.log("\n" + "=".repeat(60) + "\n");
}

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", environment: NODE_ENV });
});

// API endpoint to get all products
app.get("/api/products", (req, res) => {
    if (NODE_ENV === "development") {
        console.log("\n📦 GET /api/products - Fetching all products");
        console.log(`   Total products: ${products.length}`);
    }
    res.json(products);
});

// API endpoint for checkout
app.post("/api/checkout", (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Invalid or empty cart" });
    }

    let totalAmount = 0;
    const orderDetails = [];

    items.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
            const subtotal = product.price * item.quantity;
            totalAmount += subtotal;
            orderDetails.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                subtotal: subtotal,
            });
        }
    });

    if (NODE_ENV === "development") {
        console.log("\n🛒 NEW ORDER");
        console.log(
            `   Total: ₹${totalAmount} | Items: ${items.reduce(
                (sum, item) => sum + item.quantity,
                0
            )}`
        );
    }

    res.json({
        message: "Order placed successfully!",
        totalAmount: totalAmount,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        orderDetails: NODE_ENV === "development" ? orderDetails : undefined,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${NODE_ENV}`);
});
