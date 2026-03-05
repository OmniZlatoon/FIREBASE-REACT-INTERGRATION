src/
├── app.js                     # Express app setup
├── server.js                  # App bootstrap (listen, env)
│
├── config/
│   ├── env.js                 # Environment variables
│   ├── db.js                  # PostgreSQL Pool
│   └── logger.js              # Winston / pino config
│
├── db/
│   ├── migrations/            # SQL migration files
│   │   ├── 001_create_users.sql
│   │   └── 002_create_orders.sql
│   ├── seeds/                 # Seed data (dev/test)
│   └── index.sql              # Optional init script
│
├── modules/                   # Domain-based modules (BEST PRACTICE)
│   ├── user/
│   │   ├── user.routes.js
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.repository.js
│   │   └── user.schema.js     # Validation (zod/joi)
│   │   |__ user.verifyOTP.js
│   ├── auth/
│   │   ├── auth.routes.js
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   └── auth.schema.js
│   │
│   └── order/
│       ├── order.routes.js
│       ├── order.controller.js
│       ├── order.service.js
│       ├── order.repository.js
│       └── order.schema.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validate.middleware.js
│
├── utils/
│   ├── asyncHandler.js
│   ├── ApiError.js
│   └── constants.js
│
├── tests/
│   ├── unit/
│   └── integration/
│
└── docs/
    └── api.md





HTTP Request
   ↓
Route
   ↓
Controller        → handles req/res only
   ↓
Service           → business rules
   ↓
Repository        → raw SQL only
   ↓
PostgreSQL
