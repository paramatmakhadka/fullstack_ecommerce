# MERN Ecommerce Starter

This workspace contains two folders: `backend` (Express + MongoDB) and `frontend` (Vite + React).

Quick start:

1. Backend

```bash
cd backend
npm install
# copy .env.example to .env and set MONGO_URI
npm run seed   # optional, seeds sample products
npm run dev    # starts server on port 5000
```

2. Frontend

```bash
cd frontend
npm install
npm run dev    # starts Vite on port 3000
```

The frontend home page fetches products from `http://localhost:5000/api/products`.
