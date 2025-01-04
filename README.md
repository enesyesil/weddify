# Weddify

Weddify is a personalized event management platform designed to help users create custom event pages, manage guest lists, and provide tailored invitations for their events.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Event Routes](#event-routes)
  - [Guest Routes](#guest-routes)
- [Frontend Structure](#frontend-structure)
- [How to Use](#how-to-use)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features
- User authentication and session management using NextAuth.js.
- Create and manage events with customizable fields.
- Generate personalized event pages with unique links for each event.
- Manage guest lists, including adding attendees and their information.
- Real-time RSVP form integrated with event pages.
- Responsive design for seamless access across devices.

## Tech Stack
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with JWT

## Setup and Installation
### Prerequisites
1. Node.js (v16+)
2. PostgreSQL database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/weddify.git
   cd weddify
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and configure the environment variables (see [Environment Variables](#environment-variables)).
4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Add the following variables to your `.env.local` file:
```env
DATABASE_URL=your_postgres_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Database Schema
### User Table
- `id` (Int, Primary Key, Auto-increment)
- `email` (String, Unique)
- `password` (String)
- `events` (Relation to Event table)

### Event Table
- `id` (Int, Primary Key, Auto-increment)
- `name` (String)
- `date` (DateTime)
- `location` (String)
- `message` (String)
- `headerText` (String)
- `footerText` (String)
- `userId` (Int, Foreign Key)
- `guests` (Relation to Guest table)

### Guest Table
- `id` (Int, Primary Key, Auto-increment)
- `firstName` (String)
- `lastName` (String)
- `howMany` (Int)
- `eventId` (Int, Foreign Key)

## API Endpoints
### Auth Routes
- **`POST /api/auth/register`**: Register a new user.
- **`POST /api/auth/login`**: Log in a user.
- **`GET /api/auth/logout`**: Log out the current user.

### Event Routes
- **`GET /api/events`**: Fetch events created by the logged-in user.
- **`POST /api/events`**: Create a new event.
- **`GET /api/events/[id]`**: Fetch details of a specific event.
- **`PUT /api/events/[id]`**: Update event details.
- **`DELETE /api/events/[id]`**: Delete an event.

### Guest Routes
- **`GET /api/events/[id]/guests`**: Fetch all guests for a specific event.
- **`POST /api/events/[id]/guests`**: Add a new guest to an event.

## Frontend Structure
```
src/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── dashboard/        # Dashboard for managing events
│   │   ├── index.tsx     # Dashboard home
│   │   ├── create-event/ # Create Event Page
│   └── event/[id]/       # Event-specific pages
├── components/           # Reusable components
├── styles/               # Global styles
├── prisma/               # Prisma schema and migrations
└── pages/api/            # API routes
```

## How to Use
1. Register as a new user or log in with existing credentials.
2. Access the dashboard to create and manage events.
3. Share the generated event page link with guests.
4. Track RSVPs and manage guest lists via the dashboard.

## Future Enhancements
- Add email notifications for RSVPs.
- Support for additional payment integration.
- Real-time updates for guest management.
- Add analytics for event organizers.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

