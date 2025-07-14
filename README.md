# User activity tracker

A microservices-based user activity tracking system built with Node.js, TypeScript, Drizzle ORM and PostgreSQL. The system demonstrates a clean separation of concerns with dedicated services for reading and writing operations.

## Architecture

This project consists of three main components:

### 1. **Writer service** (`writer/`)
- **Purpose**: handles all write operations (CREATE, UPDATE, DELETE)
- **Database user**: `writer_user` (full CRUD permissions)

### 2. **Reader service** (`reader/`)
- **Purpose**: handles all read operations (SELECT queries only)
- **Database User**: `reader_user` (read-only permissions)

### 3. **Shared package** (`shared/`)
- **Purpose**: contains database schema, migrations and shared utilities
- **Database**: PostgreSQL with Drizzle ORM
- **Features**: database migrations, schema definitions, validation schemas

## Getting started

### Prerequisites
- Docker
- Node.js (v18 or higher)
- npm

### Setup

#### 1. Start the database
```bash
docker-compose up -d
```
This will start a PostgreSQL container with:
- Database: `activity_tracker`
- User: `postgres`
- Password: `postgres`
- Port: `5432`

#### 2. Initialize database users
The database users are automatically created when the container starts up (via the init script).

#### 3. Install dependencies
```bash
# Install shared package dependencies
cd shared
npm install

# Install writer service dependencies
cd writer
npm install

# Install reader service dependencies
cd reader
npm install
```

#### 4. Run database migrations and apply database permissions
```bash
cd shared
npm run db:migrate-and-grant-access
```

This script will:
- run the database migrations
- apply the appropriate permissions for `reader_user` and `writer_user`

#### 5. Start the services

**Terminal 1 - start writer service:**
```bash
cd writer
npm run dev
```
The writer service will be available at `http://localhost:3000`

**Terminal 2 - start reader service:**
```bash
cd reader
npm run dev
```
The reader service will be available at `http://localhost:3001`

## Security model

The system implements a robust security model with role-based access:

### Writer user (`writer_user`)
- **Permissions**: SELECT, INSERT, UPDATE, DELETE
- **Purpose**: full CRUD operations on all tables
- **Used by**: writer service for creating/updating data

### Reader user (`reader_user`)
- **Permissions**: SELECT only
- **Purpose**: read-only access to all tables
- **Used by**: reader service for querying data

## API endpoints

### Writer service
- `GET /users` - List all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user
- `GET /activities` - List all activities
- `POST /activities` - Create a new activity
- `PUT /activities/:id` - Update an activity
- `DELETE /activities/:id` - Delete an activity

### Reader service
- `GET /users` - List all users
- `GET /users/:id` - Get a specific user
- `GET /activities` - List all activities
- `GET /activities/:id` - Get a specific activity

## Development

### Project Structure
```
user-activity-tracker/
├── docker-compose.yml          # Database container configuration
├── shared/                     # Shared database and utilities
│   ├── db/
│   │   ├── schema/             # Drizzle ORM schema definitions
│   │   └── migrations/         # Database migration files
│   ├── sql/                    # SQL scripts for user setup
│   └── services/               # Shared business logic
├── writer/                     # Write operations service
│   └── src/
│       ├── routes/             # API route handlers
│       └── services/           # Business logic
└── reader/                     # Read operations service
    └── src/
        ├── routes/             # API route handlers
        └── services/           # Business logic
```

### Database Migrations
To create a new migration:
```bash
cd shared
npm run db:generate
```

To apply migrations:
```bash
cd shared
npm run db:migrate
```

## Environment Variables

Create `.env` files in each service directory if needed:

**shared/.env:**
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/activity_tracker
```

**writer/.env:**
```
DATABASE_URL=postgres://writer_user:password@localhost:5432/activity_tracker
```

**reader/.env:**
```
DATABASE_URL=postgres://reader_user:password@localhost:5432/activity_tracker
```
