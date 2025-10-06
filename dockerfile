# Multi-stage build for E-commerce App (Production)
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies for both frontend and backend
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Install backend dependencies
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm ci --only=production

# Copy all files and build frontend
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy backend server files
COPY --from=build /app/server ./server
COPY --from=build /app/server/node_modules ./server/node_modules

# Copy built frontend
COPY --from=build /app/dist ./dist

# Copy necessary config files
COPY --from=build /app/vercel.json ./vercel.json
COPY --from=build /app/api ./api

# Install serve to serve frontend (production-ready static server)
RUN npm install -g serve

# Start both backend and frontend
CMD ["sh", "-c", "cd server && node server.js & serve -s dist -l 80"]
