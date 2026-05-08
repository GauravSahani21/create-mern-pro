# create-mern-pro 🚀
https://www.npmjs.com/package/create-mern-pro

A fast, interactive, production-ready CLI tool to instantly scaffold a modern MERN (MongoDB, Express, React, Node.js) stack application. Stop wasting time configuring Webpack, setting up Express routes, or wiring up Redux. Run one command and get straight to building your application.

## Features ✨

- ⚡️ **Frontend:** React powered by Vite + Tailwind CSS
- 🖥️ **Backend:** Express API + MongoDB (Mongoose)
- 🔒 **Authentication (Optional):** Pre-built JWT Login & Registration boilerplate
- 📦 **State Management (Optional):** Choose between Redux Toolkit, Zustand, or simple Context API
- 🛠️ **TypeScript Support:** Choose between JavaScript or strictly-typed TypeScript
- 🧹 **Code Quality:** Optional ESLint and Prettier setup
- 📂 **Monorepo Structure:** Clean separation of `/client` and `/server` with concurrent running

## Usage 🛠️

You don't need to install this globally. Just use `npx`:

```bash
npx create-mern-pro my-app
```

*Replace `my-app` with your desired project name.*

### Interactive Setup
The CLI will ask you a few simple questions to customize your stack:

1. **Use TypeScript?** (Yes / No)
2. **MongoDB Setup:** Local (`mongodb://127.0.0.1:27017`) or Atlas connection string.
3. **Include JWT Auth?** (Yes / No) - *Generates robust login/register routes, controllers, and UI.*
4. **State Management:** None (Context), Redux Toolkit, or Zustand.
5. **Add Linting?** (Yes / No) - *Configures ESLint + Prettier.*
6. **Package Manager:** npm, yarn, or pnpm.

## Running Your App 🏁

Once generated, navigate into your project:

```bash
cd my-app
```

Then, you can run the entire full-stack application (frontend + backend) simultaneously with one command:

```bash
npm run dev
```

* This automatically spins up the **Express server** (usually on `http://localhost:5000`)
* This automatically spins up the **Vite frontend** (usually on `http://localhost:5173`)

## Directory Structure 📁

```text
my-app/
├── client/          # Vite React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/          # Express API
│   ├── config/      # DB connection
│   ├── controllers/ # Route logic
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routes
│   ├── index.js     # Entry point
│   ├── package.json
│   └── .env         # Environment variables
└── package.json     # Root workspace configuration
```

## License 📜
MIT License
