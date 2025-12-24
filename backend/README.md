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

If you want, I can add more endpoints to this `README.md` or convert it into a `docs/` folder with multiple endpoint files. ✅
