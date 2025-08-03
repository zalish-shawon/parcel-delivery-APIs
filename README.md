# Parcel Delivery Backend

A secure, modular, and role-based backend API for a parcel delivery system using **Node.js**, **Express.js**, **Mongoose**, **TypeScript**, and **JWT**.

## Features
- **Authentication & Authorization**
  - JWT-based login and registration
  - Roles: `admin`, `sender`, `receiver`
- **Parcel Management**
  - Create, cancel, and track parcels
  - Status history embedded in the parcel document
- **Admin Controls**
  - Block/unblock users
  - View all parcels and users
- **User Management**
  - View users, block/unblock via endpoints
- **Validation**
  - Request validation with Zod
- **Weight-based fee calculation**
- **Clean Modular Code Architecture**

## Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- TypeScript
- Zod (for input validation)
- JWT for authentication
- bcrypt for password hashing
- ESLint & Prettier for code quality

## Installation
```bash
git clone <repo_url>
cd parcel-delivery-backend
npm install
```

### Environment Variables
Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/parcel_db
JWT_SECRET=your_secret_key
```

## Running the Project
### Development
```bash
npm run dev
```
### Build
```bash
npm run build
npm start
```

## Seeding Default Admin
```bash
npm run ts-node src/seed/admin.seed.ts
```
Default admin:
```
email: kate@example.com
password: 123456
```

## API Endpoints
### Auth
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout

### Parcels (Sender)
- `POST /api/parcels` – Create parcel (Sender only)
- `GET /api/parcels/me` – View own parcels (Sender only)
- `PATCH /api/parcels/cancel/:id` – Cancel parcel (if not dispatched)

### Parcels (Receiver)
- `GET /api/parcels/incoming` – View incoming parcels

### Parcels (Admin)
- `PATCH /api/parcels/status/:id` – Update parcel status

### Users (Admin)
- `GET /api/users` – Get all users
- `GET /api/users/:id` – Get user by ID
- `PATCH /api/users/block/:id` – Block user
- `PATCH /api/users/unblock/:id` – Unblock user

### Admin
- `GET /api/admin/parcels` – Get all parcels
- `GET /api/admin/users` – Get all users (same as /api/users)


## License
MIT
