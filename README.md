# Ecommerce Platform

A modern ecommerce platform built with NestJS, Prisma, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or later)
- npm or yarn
- PostgreSQL
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Topaz-Oz/Ecommerce-platform.git
cd ecommerce-platform/backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db?schema=public"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="24h"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Database Setup with Prisma

1. Generate Prisma Client:
```bash
npx prisma generate
```

2. Run database migrations:
```bash
npx prisma migrate dev
```

3. (Optional) Seed the database with sample data:
```bash
npx prisma db seed
```

4. (Optional) View your database with Prisma Studio:
```bash
npx prisma studio
```
This will open Prisma Studio on http://localhost:5555

## Running the Application

1. Start the development server:
```bash
npm run start:dev
# or
yarn start:dev
```

The server will start on http://localhost:3000

## API Documentation (Swagger)

Once the server is running, you can access the Swagger documentation at:
http://localhost:3000/api-docs

The Swagger UI provides:
- Complete API endpoint listing
- Request/Response schema documentation
- Try-it-out functionality for testing endpoints
- Authentication support
- Schema models overview

## Available API Endpoints

### Authentication
- POST `/auth/login` - User login
- POST `/auth/register` - User registration
- GET `/auth/profile` - Get user profile

### Users
- GET `/users` - List all users
- GET `/users/:id` - Get user by ID
- PATCH `/users/:id` - Update user
- DELETE `/users/:id` - Delete user

### Products
- GET `/products` - List all products
- POST `/products` - Create new product
- GET `/products/:id` - Get product by ID
- PATCH `/products/:id` - Update product
- DELETE `/products/:id` - Delete product

### Orders
- GET `/orders` - List all orders
- POST `/orders` - Create new order
- GET `/orders/:id` - Get order by ID
- PATCH `/orders/:id` - Update order status

### Categories
- GET `/categories` - List all categories
- POST `/categories` - Create new category
- GET `/categories/:id` - Get category by ID

## Database Schema Management

### Create a New Migration
When you make changes to the schema.prisma file:
```bash
npx prisma migrate dev --name descriptive_name
```

### Reset Database
To reset your database and apply all migrations:
```bash
npx prisma migrate reset
```

### View Migration History
```bash
npx prisma migrate status
```

## Common Issues and Solutions

### Prisma Client Generation Issues
If you encounter issues with Prisma Client:
```bash
# Reset Prisma
rm -rf node_modules/.prisma
npm install
npx prisma generate
```
npm i --save-dev prisma@latest -> in order to update the lastest prisma client version

### Database Connection Issues
1. Verify your DATABASE_URL in .env
2. Ensure PostgreSQL is running
3. Check database exists:
```bash
psql -U postgres
CREATE DATABASE ecommerce_db;
```

### API Testing
1. Use Swagger UI for quick tests
2. Import the provided Postman collection:
   - Go to Postman
   - Import -> Select `ecommerce-platform.postman_collection.json`
   - Set up environment variables

