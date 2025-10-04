
## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Book Endpoints

#### Get All Books
```http
GET /api/books?page=1&limit=5&search=&genre=&sortBy=createdAt&sortOrder=desc
```

#### Get Single Book
```http
GET /api/books/:id
```

#### Create Book
```http
POST /api/books
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "description": "Book description...",
  "genre": "Fiction",
  "publishedYear": 2023
}
```

#### Update Book
```http
PUT /api/books/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Author Name",
  "description": "Updated description...",
  "genre": "Fiction",
  "publishedYear": 2023
}
```

#### Delete Book
```http
DELETE /api/books/:id
Authorization: Bearer <jwt_token>
```

### Review Endpoints

#### Get Reviews for Book
```http
GET /api/reviews/book/:bookId
```

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bookId": "book_id_here",
  "rating": 5,
  "reviewText": "Great book! Really enjoyed it..."
}
```

#### Update Review
```http
PUT /api/reviews/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "rating": 4,
  "reviewText": "Updated review text..."
}
```

#### Delete Review
```http
DELETE /api/reviews/:id
Authorization: Bearer <jwt_token>
```

#### Get User Reviews
```http
GET /api/reviews/user/:userId
```
