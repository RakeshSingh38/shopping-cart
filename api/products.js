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
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const productsData = loadProducts();
            res.status(200).json(productsData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to load products' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
