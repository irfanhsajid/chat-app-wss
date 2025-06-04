# NestJS Chat App with Socket.IO

A real-time chat application built with NestJS, TypeORM, and Socket.IO.

## Features

- Real-time messaging between users
- Message persistence in database
- User registration and authentication
- WebSocket communication

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd chat-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with the following content:

```
PORT=3000
APP_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=chat_app
```

Make sure to adjust the database credentials according to your PostgreSQL setup.

## Database Setup

1. Create a PostgreSQL database named `chat_app`

2. Run database migrations and seeders

```bash
npm run db:seed
```

This will create two test users:

- Username: user1, Password: password1
- Username: user2, Password: password2

## Running the Application

1. Start the development server

```bash
npm run start:dev
```

2. Access the chat application
   Open your browser and navigate to `http://localhost:3000/chat.html`

## Usage

1. Select a user from the dropdown and click "Login"
2. Select another user to chat with
3. Type your message and click "Send"

## API Endpoints

- `GET /users` - Get all users
- `GET /users/:id` - Get a user by ID
- `POST /users` - Create a new user

## WebSocket Events

- `register` - Register a user with the WebSocket server
- `message` - Send a message to another user
- `getMessages` - Get message history between two users

## License

[MIT](LICENSE)
