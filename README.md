# Todo App

A full-stack todo application with user authentication and per-user todo management.

## Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS 4, react-router 7 |
| **Backend** | Express 5, Mongoose 9, MongoDB |
| **Auth** | JWT (access + refresh tokens), bcrypt |

## Features

- User registration & login with form validation
- JWT authentication with access token (15m) and rotating refresh token (7d, httpOnly cookie)
- Auto token refresh on page interaction
- Full CRUD for todos (scoped to authenticated user)
- Protected routes (redirect to login if unauthenticated)
- Glassmorphic UI with toast notifications
- Real-time regex validation on signup fields

## Project Structure

```
todo-app/
├── backend/
│   ├── config/env.js              # Environment variable loader
│   ├── controllers/
│   │   ├── todos.controller.js    # Todo CRUD logic
│   │   └── users.controller.js    # Auth & user logic
│   ├── middlewares/
│   │   └── auth.middleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── todos.model.js         # Todo schema
│   │   ├── users.model.js         # User schema
│   │   └── refreshToken.model.js  # Refresh token schema
│   ├── routers/
│   │   ├── todos.router.js        # /todos routes
│   │   └── users.router.js        # /users routes
│   ├── index.js                   # Express app entry
│   ├── .env                       # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # Entry point, Axios config, router
│   │   ├── App.jsx                # Root layout
│   │   ├── const.js               # Validation regex
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx     # Auth guard wrapper
│   │   │   └── PublicLayout.jsx   # Guest-only wrapper
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Main todo dashboard
│   │   │   ├── NotLogged.jsx      # Landing page
│   │   │   ├── SignIn.jsx         # Login form
│   │   │   └── SignUp.jsx         # Registration form
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Container.jsx      # Gradient wrapper
│   │   │   ├── Input.jsx
│   │   │   ├── LinkButton.jsx
│   │   │   ├── NotValid.jsx       # Validation error
│   │   │   └── Todo.jsx           # Todo card (edit/delete)
│   │   └── loaders/
│   │       └── getTodos.loader.jsx# Route data loader
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB running locally on port 27017 (or adjust `MONGO_URL` in `.env`)
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd todo-app

# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install
```

### Configuration

Edit `backend/.env` to match your environment:

```env
PORT=5500
MONGO_URL=mongodb://127.0.0.1:27017/todo-app
ACCESS_TOKEN_SECRET=<your-secret>
REFRESH_TOKEN_SECRET=<your-secret>
```

### Run

Start both servers in separate terminals:

```bash
# Terminal 1 - Backend
cd backend
pnpm dev

# Terminal 2 - Frontend
cd frontend
pnpm dev
```

Open **http://localhost:5173** in your browser.

## API Endpoints

All `Authorization: Bearer <token>` headers are required for protected routes.

### Users

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/users` | No | Register a new user |
| `POST` | `/users/login` | No | Login, returns accessToken + sets refreshToken cookie |
| `POST` | `/users/token` | No | Refresh access token |
| `GET` | `/users` | Yes | Get current user info |
| `DELETE` | `/users/logout` | No | Logout (clears refresh token) |

### Todos

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/todos` | Yes | Get all todos for the authenticated user |
| `GET` | `/todos/:todoId` | Yes | Get a specific todo |
| `POST` | `/todos` | Yes | Create a new todo |
| `PUT` | `/todos/:todoId` | Yes | Update a todo's title/description |
| `DELETE` | `/todos/:todoId` | Yes | Delete a todo |

## Scripts

### Backend

| Script | Command |
|---|---|
| `pnpm dev` | Start with nodemon (hot reload) |

### Frontend

| Script | Command |
|---|---|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## License

ISC
