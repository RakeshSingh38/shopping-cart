// Use relative paths - Vite proxy will handle local dev, Vercel will handle production
const API_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
    PRODUCTS: `${API_URL}/api/products`,
    CHECKOUT: `${API_URL}/api/checkout`,
    HEALTH: `${API_URL}/api/health`
};

export default API_URL;
