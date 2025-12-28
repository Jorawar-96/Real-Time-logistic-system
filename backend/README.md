# Users API — /users/register 🔐

## Endpoint
**POST** `/users/register`

## Description
Create a new user account and return a JWT authentication token along with the created user object.

---

## Request body (JSON)
- **fullname** (object)
  - `firstname` (string) — required, minimum 3 characters
  - `lastname` (string) — optional, minimum 3 characters
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Example:

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "strongpassword"
}
```

---

## Responses
- **201 Created**
  - Body: `{ token: string, user: object }` — token is a JWT used for authentication, `user` contains the created user (password is not returned).

- **400 Bad Request**
  - Validation errors (express-validator) when required fields are missing or invalid. Response includes an `errors` array describing problems.

- **409 Conflict**
  - Attempt to register with an email that already exists (duplicate key from MongoDB). Response may vary depending on error handling.

- **500 Internal Server Error**
  - For unexpected server/database errors.

---

## Notes / Implementation details
- The server expects the `JWT_SECRET_KEY` environment variable to be set (used to sign JWTs). If it is missing, token creation will throw: `secretOrPrivateKey must have a value`.
- Passwords are hashed before saving.
- `fullname.lastname` is optional but if provided should meet the minimum length validation.

---
1
## Quick curl example
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"strongpassword"}'
```

---

# Users API — /users/login 🔐

## Endpoint
**POST** `/users/login`

## Description
Authenticate an existing user and return a JWT authentication token along with the user object.

---

## Request body (JSON)
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Example:

```json
{
  "email": "john@example.com",
  "password": "strongpassword"
}
```

---

## Responses
- **200 OK**
  - Body: `{ token: string, user: object }` — token is a JWT used for authentication, `user` contains the authenticated user (password is not returned).

- **400 Bad Request**
  - Validation errors (express-validator) when required fields are missing or invalid. Response includes an `errors` array describing problems.

- **401 Unauthorized**
  - Invalid email or password.

- **500 Internal Server Error**
  - For unexpected server/database errors.

---

## Quick curl example
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"strongpassword"}'
```

---

# Users API — /users/profile 🔒

## Endpoint
**POST** `/users/profile`

## Description
Return the authenticated user's profile. This endpoint is protected and requires a valid JWT token sent either as a cookie (`token`) or an `Authorization: Bearer <token>` header.

## Request body
No request body required. The endpoint reads authentication from the cookie or header.

## Responses
- **200 OK**
  - Body: the user object returned by the server (same format as used in login/register responses).
- **401 Unauthorized**
  - Returned when the token is missing, invalid, blacklisted, or expired.
- **500 Internal Server Error**
  - For unexpected server/database errors.

---

# Users API — /users/logout 🔐

## Endpoint
**POST** `/users/logout`

## Description
Invalidate the current JWT (adds it to a blacklist) and clear the cookie named `token`. Supports tokens sent via cookie or `Authorization` header. The route is protected (requires an auth token) and also provides a `GET /users/logout` for backward compatibility.

## Request body
No request body required. Provide the token via cookie or header.

## Responses
- **200 OK**
  - Body: `{ message: "logged out" }` — token successfully blacklisted and cookie cleared.
- **401 Unauthorized**
  - Returned if the user is not authenticated (missing/invalid token).
- **500 Internal Server Error**
  - For unexpected server/database errors.

---

If you want, I can add more endpoints to this `README.md` or convert it into a `docs/` folder with multiple endpoint files. ✅

---

# Captains API — /captain 🧑‍✈️

## Overview
Create and authenticate captains (drivers). All endpoints return JSON and protected routes require a valid JWT token sent as an `Authorization: Bearer <token>` header or a cookie named `token`.

---

### POST /captain/register
Create a new captain and return a JWT plus the created captain object (password not returned).

Request body (JSON):

```jsonc
{
  "fullname": {
    "firstname": "Kareem", // required, string, min 3 chars
    "lastname": "Ali"      // optional, string, min 3 chars if provided
  },
  "email": "kareem@example.com", // required, must be a valid email, unique
  "password": "strongpassword",  // required, min 6 chars
  "vehicle": {
    "color": "red",        // required, string, min 3 chars
    "plate": "ABC123",     // required, string, min 3 chars
    "capacity": 4,           // required, integer >= 1
    "vehicleType": "Car"   // required, case-sensitive
                             // routes validator accepts: 'Car', 'Motorcycle', 'Auto'
                             // NOTE: model enum is ['Motorcycle','Car','autoRickshaw'] -> potential mismatch with 'Auto'
  }
}
```

Success response (201 Created):

```jsonc
{
  "token": "eyJhbGciOi...", // JWT used for authentication (also set as httpOnly cookie 'token')
  "captain": {
    "_id": "644...",
    "fullname": { "firstname": "Kareem", "lastname": "Ali" },
    "email": "kareem@example.com",
    "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "Car" },
    "status": "inactive" // default
  }
}
```

Validation error example (400 Bad Request):

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

Duplicate email example (409 Conflict):

```json
{ "message": "Captain already Exist" }
```

---

### POST /captain/login
Authenticate and return a JWT and the captain object (password not returned). The server also sets an httpOnly cookie named `token`.

Request body (JSON):

```jsonc
{
  "email": "kareem@example.com", // required
  "password": "strongpassword"   // required
}
```

Success response (200 OK):

```jsonc
{
  "token": "eyJhbGciOi...",
  "captain": {
    "_id": "644...",
    "fullname": { "firstname": "Kareem", "lastname": "Ali" },
    "email": "kareem@example.com",
    "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "Car" },
    "status": "active"
  }
}
```

Unauthorized example (401):

```json
{ "message": "Invalid email or password" }
```

---

### POST /captain/profile 🔒
Protected — returns the authenticated captain's profile.

Request body: none (token via cookie or Authorization header)

Success response (200 OK):

```json
{ "captain": { /* full captain object as returned in login/register */ } }
```

Unauthorized example (401):

```json
{ "message": "Unauthorized" }
```

---

### GET /captain/logout or POST /captain/logout 🔐
Invalidate the current JWT (added to a blacklist) and clear cookie `token`.

Success response (200 OK):

```json
{ "message": "Logout successfully" }
```

---

## Notes / Implementation details ⚠️
- The route validator (`routes/captain.routes.js`) currently accepts `vehicle.vehicleType` values `['Car','Motorcycle','Auto']` (case-sensitive). The Mongoose schema enum is `['Motorcycle','Car','autoRickshaw']`. This mismatch may cause valid inputs (e.g., `"Auto"`) to fail at the model layer unless inputs are normalized or the schema is adjusted.
- The controller must return both the generated JWT and the created captain object (without password). Ensure the response shape is `{ token, captain }`.
- `JWT_SECRET_KEY` environment variable is required to sign tokens.
- Passwords are hashed using `captainModel.hashpassword` before saving.

---

## Quick curl example
```bash
curl -X POST http://localhost:4000/captain/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Kareem","lastname":"Ali"},"email":"kareem@example.com","password":"strongpassword","vehicle":{"color":"red","plate":"ABC123","capacity":4,"vehicleType":"Car"}}'
```

---

