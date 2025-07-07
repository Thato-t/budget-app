# Expensify Backend

This is the backend API for the Expensify, built with Node.js, Express, and MongoDB.

---

## Features
- User authentication and management
- CRUD operations for transactions
- Expense categories (fixed, variable, savings, investments, emergencies, debts, givings)
- Logging and reporting endpoints
- Secure API with CORS and environment variable support

---

## Project Structure
```
backend/
├── models/        # Mongoose models (user, transaction, log, etc.)
├── routes/        # API route handlers
├── server.js      # Main server entry point
├── package.json   # Backend dependencies
└── README.md      # This file
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Setup
```bash
cd backend
npm install
# Create a .env file for MongoDB URI and secrets
npm start
```

### Environment Variables
Create a `.env` file in `/backend` with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## API Endpoints
- `POST /user/register` — Register a new user
- `POST /user/login` — Login and receive JWT
- `GET /transactions` — Get all transactions for user
- `POST /transactions` — Add a new transaction
- `PUT /transactions/:id` — Update a transaction
- `DELETE /transactions/:id` — Delete a transaction
- ...and more (see `/routes/`)

---

## Security Notes
- All sensitive data is stored in environment variables
- Passwords should be hashed before storage (implement if not already)
- Use authentication middleware to protect private routes
- Validate and sanitize all incoming data

---

## License
[MIT](../LICENSE)
