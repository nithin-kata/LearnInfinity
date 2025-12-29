# LearnInfinity API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: [Your production URL]/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All API responses follow this standard format:
```json
{
  "success": boolean,
  "message": string,
  "data": object (optional),
  "error": string (optional)
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account with 24 free credits.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters, maximum 50 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully! You have been awarded 24 free credits.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 24,
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "stats": {
      "credits": 24,
      "sessionsCompleted": 0,
      "totalHoursTaught": 0,
      "totalHoursLearned": 0,
      "rating": 5.0,
      "skillsOffered": 0,
      "skillsLearning": 0
    }
  }
}
```

**Error Responses:**
- `400`: Validation error or user already exists
- `500`: Server error

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 22,
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T14:30:00.000Z",
    "stats": {
      "credits": 22,
      "sessionsCompleted": 2,
      "totalHoursTaught": 3,
      "totalHoursLearned": 5,
      "rating": 4.8,
      "skillsOffered": 2,
      "skillsLearning": 1
    }
  }
}
```

**Error Responses:**
- `400`: Missing email or password
- `401`: Invalid credentials or inactive account
- `500`: Server error

---

### Get Current User
**GET** `/auth/me`

Get current authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 22,
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T14:30:00.000Z",
    "stats": {
      "credits": 22,
      "sessionsCompleted": 2,
      "totalHoursTaught": 3,
      "totalHoursLearned": 5,
      "rating": 4.8,
      "skillsOffered": 2,
      "skillsLearning": 1
    }
  }
}
```

**Error Responses:**
- `401`: No token provided or invalid token
- `500`: Server error

---

### Update User Profile
**PUT** `/auth/profile`

Update user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "credits": 22,
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T14:30:00.000Z",
    "stats": {
      "credits": 22,
      "sessionsCompleted": 2,
      "totalHoursTaught": 3,
      "totalHoursLearned": 5,
      "rating": 4.8,
      "skillsOffered": 2,
      "skillsLearning": 1
    }
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Server error

---

## Skills Management Endpoints

### Add Skill
**POST** `/auth/skills`

Add a new skill to user's profile (either offered or learning).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "skill": "JavaScript Programming",
  "category": "Programming",
  "level": "Advanced",
  "description": "Full-stack JavaScript development with React and Node.js",
  "type": "offered"
}
```

**Parameters:**
- `skill`: Required, skill name
- `category`: Required, skill category
- `level`: Required, one of ["Beginner", "Intermediate", "Advanced"]
- `description`: Optional, skill description
- `type`: Required, either "offered" or "learning"

**Success Response (200):**
```json
{
  "success": true,
  "message": "Skill added successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 22,
    "skillsOffered": [
      {
        "skill": "JavaScript Programming",
        "category": "Programming",
        "level": "Advanced",
        "description": "Full-stack JavaScript development with React and Node.js"
      }
    ],
    "skillsLearning": [],
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T14:30:00.000Z",
    "stats": {
      "credits": 22,
      "sessionsCompleted": 2,
      "totalHoursTaught": 3,
      "totalHoursLearned": 5,
      "rating": 4.8,
      "skillsOffered": 1,
      "skillsLearning": 0
    }
  }
}
```

**Error Responses:**
- `400`: Missing required fields or invalid type
- `401`: Unauthorized
- `500`: Server error

---

### Remove Skill
**DELETE** `/auth/skills/:type/:index`

Remove a skill from user's profile.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
- `type`: Either "offered" or "learning"
- `index`: Array index of the skill to remove (0-based)

**Example:**
```
DELETE /auth/skills/offered/0
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Skill removed successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 22,
    "skillsOffered": [],
    "skillsLearning": [],
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T14:30:00.000Z",
    "stats": {
      "credits": 22,
      "sessionsCompleted": 2,
      "totalHoursTaught": 3,
      "totalHoursLearned": 5,
      "rating": 4.8,
      "skillsOffered": 0,
      "skillsLearning": 0
    }
  }
}
```

**Error Responses:**
- `400`: Invalid skill index or type
- `401`: Unauthorized
- `500`: Server error

---

## Session Management Endpoints

### Start Session
**POST** `/auth/start-session`

Start a learning session for credit tracking.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Session started successfully",
  "sessionStartTime": "2023-09-06T15:00:00.000Z",
  "userCredits": 22
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Server error

---

### End Session
**POST** `/auth/end-session`

End the current learning session.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Session ended successfully"
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Server error

---

## Credit Management Endpoints

### Deduct Credit
**POST** `/auth/deduct-credit`

Manually deduct one credit from user (typically handled automatically by the system).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Credit deducted successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 21,
    "skillsOffered": [],
    "skillsLearning": [],
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T15:00:00.000Z",
    "stats": {
      "credits": 21,
      "sessionsCompleted": 2,
      "totalHoursTaught": 3,
      "totalHoursLearned": 6,
      "rating": 4.8,
      "skillsOffered": 0,
      "skillsLearning": 0
    }
  },
  "hoursSpent": 6
}
```

**Error Responses:**
- `400`: Insufficient credits
- `401`: Unauthorized
- `500`: Server error

---

### Add Credit
**POST** `/auth/add-credit`

Add credits to user account (when teaching or completing sessions).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "hours": 2
}
```

**Parameters:**
- `hours`: Optional, number of hours taught (default: 1)

**Success Response (200):**
```json
{
  "success": true,
  "message": "2 credit(s) added successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 23,
    "skillsOffered": [],
    "skillsLearning": [],
    "joinedDate": "2023-09-06T10:30:00.000Z",
    "lastLogin": "2023-09-06T15:00:00.000Z",
    "stats": {
      "credits": 23,
      "sessionsCompleted": 3,
      "totalHoursTaught": 5,
      "totalHoursLearned": 6,
      "rating": 4.8,
      "skillsOffered": 0,
      "skillsLearning": 0
    }
  },
  "creditsEarned": 2
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Server error

---

## System Endpoints

### Health Check
**GET** `/health`

Check API server status and database connection.

**Success Response (200):**
```json
{
  "message": "LearnInfinity API is running!",
  "database": "Connected",
  "timestamp": "2023-09-06T15:30:00.000Z"
}
```

---

### API Info
**GET** `/`

Get basic API information and available endpoints.

**Success Response (200):**
```json
{
  "message": "LearnInfinity API Server",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "register": "POST /api/auth/register",
    "login": "POST /api/auth/login",
    "profile": "GET /api/auth/me"
  }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Invalid or missing authentication |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider implementing rate limiting to prevent abuse.

## Security Considerations

1. **JWT Tokens**: Expire after 7 days
2. **Password Hashing**: Uses bcrypt with cost factor 12
3. **Input Validation**: All inputs are validated and sanitized
4. **CORS**: Configured for cross-origin requests
5. **Environment Variables**: Sensitive data stored in environment variables

## Session Management

The system automatically tracks user sessions and deducts credits:
- Sessions start when users make authenticated API calls
- Credits are deducted after 1 hour of activity
- Sessions are cleaned up on logout or server shutdown
- Activity is tracked through API interactions

---

*This API documentation is maintained alongside the codebase. For the latest updates, refer to the source code and test the endpoints directly.*