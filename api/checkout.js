import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let products = null;

const loadProducts = () => {
    if (!products) {
        const productsPath = join(__dirname, "..", "server", "data", "products.json");
        products = JSON.parse(readFileSync(productsPath, "utf-8"));
    }
    return products;
};

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const { items } = req.body;

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: "Invalid or empty cart" });
            }

            const productsData = loadProducts();
            let totalAmount = 0;
            const orderDetails = [];

            items.forEach((item) => {
                const product = productsData.find((p) => p.id === item.id);
                if (product) {
                    const subtotal = product.price * item.quantity;
                    totalAmount += subtotal;
                    orderDetails.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity,
                        subtotal: subtotal
                    });
                }
            });

            res.status(200).json({
                message: "Order placed successfully!",
                totalAmount: totalAmount,
                itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
            });
        } catch (error) {
            res.status(500).json({ error: 'Checkout failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
