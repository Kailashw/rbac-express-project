# RBAC Express Project

RBAC Express Project is a role-based access control (RBAC) application built with Express.js, MongoDB, and TypeScript. It provides a secure and scalable API for managing users and roles, with JWT-based authentication and authorization.

## Features

- User registration and authentication with hashed passwords
- Role management with permissions
- JWT-based authentication and role-based authorization
- API endpoints for creating, reading, updating, and deleting users and roles
- Swagger documentation for easy API exploration

## Requirements

- Node.js (>= 18)
- MongoDB server (local or remote)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/rbac-express-project.git
cd rbac-express-project
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables: Create a .env file in the root directory and add the following variables:

```
MONGODB_URI=your-mongodb-connection-string
SECRET_KEY=your-secret-key-for-jwt
```

4. Replace your-mongodb-connection-string with the connection string for your MongoDB server, and your-secret-key-for-jwt with a secret key of your choice for JWT.

```
Compile TypeScript: npm run build
Start the server: npm start
The server should now be running on http://localhost:3000.
```

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

`License : ` This project is licensed under the MIT License - see the LICENSE file for details.
