# 📚 Modern Scholar - Book Review Platform

A beginner-friendly MERN (MongoDB, Express.js, React.js, Node.js) Book Review Platform where users can sign up, log in, add books, and review books. This project demonstrates clean, readable code perfect for learning full-stack development.

### Access Here
- **Frontend** - [Click Here](https://book-review-platform-sigma.vercel.app/)
- **Backend** - [Click Here](https://book-review-platform-o6bf.onrender.com/health)

## 🎨 Theme - Modern Scholar Light

The application features a clean, light-only theme with warm colors:

- **Primary Background**: Soft cream `#FFF8E7`
- **Navigation/Headers**: Warm brown `#A67B5B`
- **Buttons/Links**: Muted teal `#4A9082`
- **Text Color**: Dark gray `#2F2F2F`
- **Card Background**: Off-white `#FDF6E3`
- **Font**: Poppins (Google Fonts)

## ✨ Features

### 🔐 User Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for authenticated users

### 📖 Book Management
- Add, edit, and delete books (CRUD operations)
- Book fields: title, author, description, genre, published year
- Only book creators can edit/delete their books
- Pagination (5 books per page)
- Search by title and author
- Filter by genre
- Sort by date added, title, author, published year, or rating

### ⭐ Review System
- Add, edit, and delete reviews
- 5-star rating system
- Users can only edit/delete their own reviews
- One review per user per book
- Dynamic average rating calculation
- Rating distribution charts using Recharts

### 📱 Responsive Design
- Mobile-friendly interface
- Tailwind CSS with beginner-friendly classes
- Poppins font throughout the application
- Clean, readable code structure

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Simple Validation** - Custom validation functions (no express-validator)

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling (beginner-friendly approach)
- **Recharts** - Charts for rating distribution
- **React Toastify** - Notifications
- **Poppins Font** - Google Fonts

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas account** (free) - [Sign up here](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - VS Code recommended

### Quick Setup (5 minutes)

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/yashpandav/Book-Review-Platform.git
   cd Book-Review-Platform
   ```

2. **Install All Dependencies**
   ```bash
   # Install root dependencies (for concurrent running)
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Return to root directory
   cd ..
   ```

3. **MongoDB Atlas Setup**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
   - Create a new cluster (choose the free tier)
   - Click "Connect" → "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

4. **Environment Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/bookreviews
   JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random
   NODE_ENV=development
   ```
   
   **Important**: Replace the MongoDB URI with your actual connection string from Atlas!

5. **Start the Application**
   
   **Option 1: Start both servers at once (Recommended)**
   ```bash
   # From the root directory
   npm run dev
   ```
   
   **Option 2: Start servers separately**
   ```bash
   # Terminal 1 - Backend Server
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend Server (in a new terminal)
   cd frontend
   npm start
   ```

6. **Access Your Application**
   - **Frontend**: http://localhost:3000 (React app)
   - **Backend API**: http://localhost:5000 (Express server)

### 🔧 Troubleshooting

**If you get MongoDB connection errors:**
- Check your MongoDB Atlas connection string
- Ensure your IP address is whitelisted in Atlas (Network Access)
- Verify your username/password in the connection string

**If ports are already in use:**
- Backend: Change `PORT=5000` to `PORT=5001` in `.env`
- Frontend: React will automatically suggest a different port

**If npm install fails:**
- Try deleting `node_modules` folders and `package-lock.json` files
- Run `npm install` again

### 📱 First Time Usage

1. Open http://localhost:3000
2. Click "Register" to create a new account
3. Add your first book using "Add Book"
4. Browse books and leave reviews
5. Check your profile to see your books and reviews

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


## ✅ **Core Requirements - COMPLETED**

#### **1. User Authentication**
- ✅ Sign up with Name, Email (unique), Password (hashed with bcrypt)
- ✅ Login with email & password
- ✅ JWT token returned on successful login
- ✅ Middleware to protect API routes
- ✅ Only authenticated users can add/edit books and reviews

#### **2. Book Management (CRUD)**
- ✅ Add books: Title, Author, Description, Genre, Published Year
- ✅ Only book creator can edit/delete their books
- ✅ All users can view books list
- ✅ Pagination implemented (5 books per page)
- ✅ Search by title/author and filter by genre
- ✅ Sort by published year, rating, date added

#### **3. Review System**
- ✅ Add reviews: Rating (1-5 stars), Review Text
- ✅ Users can edit/delete their own reviews only
- ✅ One review per user per book
- ✅ Dynamic average rating calculation
- ✅ All reviews displayed on book details page

#### **4. Frontend Pages**
- ✅ **Signup Page** - Register new users with form validation
- ✅ **Login Page** - Login form with JWT storage in localStorage
- ✅ **Book List Page (Home)** - Shows all books with pagination
- ✅ **Book Details Page** - Book info, reviews, average rating, rating charts
- ✅ **Add/Edit Book Page** - Forms for authenticated users
- ✅ **Profile Page** - User's added books and reviews

#### **5. Technical Implementation**
- ✅ **Backend**: Node.js + Express + MongoDB with Mongoose
- ✅ **Database**: MongoDB Atlas with User, Book, Review schemas
- ✅ **Frontend**: React with Router, Context API, Axios
- ✅ **Styling**: Tailwind CSS with Modern Scholar Light theme
- ✅ **Security**: bcrypt password hashing, JWT authentication
- ✅ **API Design**: RESTful endpoints with proper error handling

### 🌟 **Bonus Features - COMPLETED**

- ✅ **Search & Filter**: Advanced search by title/author, filter by genre
- ✅ **Sorting**: Multiple sort options (year, rating, date, title, author)
- ✅ **Charts**: Rating distribution visualization using Recharts
- ✅ **Enhanced UI**: Clean, beginner-friendly design with Poppins font
- ✅ **API Documentation**: Complete Postman collection included
- ✅ Deployment: Backend deployed on Render, Frontend deployed on Vercel with live URLs:
   - **Frontend** - [Click Here](https://book-review-platform-sigma.vercel.app/)
   - **Backend** - [Click Here](https://book-review-platform-o6bf.onrender.com/health)


## 📊 **Database Schema Design**

### **User Schema**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### **Book Schema**
```javascript
{
  title: String (required),
  author: String (required),
  description: String (required),
  genre: String (required),
  publishedYear: Number (required),
  addedBy: ObjectId (ref: User),
  averageRating: Number (default: 0),
  totalReviews: Number (default: 0),
  timestamps: true
}
```

### **Review Schema**
```javascript
{
  bookId: ObjectId (ref: Book),
  userId: ObjectId (ref: User),
  rating: Number (1-5, required),
  reviewText: String (required),
  timestamps: true
}
```

## 📁 Project Structure

```
book-review-platform/
├── backend/                          # Node.js + Express API
│   ├── controllers/                  # Business logic controllers (MVC pattern)
│   │   ├── authController.js         # Authentication logic
│   │   ├── bookController.js         # Book CRUD logic
│   │   └── reviewController.js       # Review CRUD logic
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js                   # User model with bcrypt
│   │   ├── Book.js                   # Book model with relations
│   │   └── Review.js                 # Review model with relations
│   ├── routes/                       # API route definitions
│   │   ├── auth.js                   # Authentication routes
│   │   ├── books.js                  # Book routes
│   │   └── reviews.js                # Review routes
│   ├── middleware/                   # Custom middleware
│   │   └── auth.js                   # JWT authentication middleware
│   ├── .env                          # Environment variables (create this)
│   ├── .env.example                  # Environment variables template
│   ├── package.json                  # Backend dependencies
│   └── server.js                     # Express server setup
├── frontend/                         # React application
│   ├── public/
│   │   ├── index.html                # HTML template
│   │   └── manifest.json             # PWA manifest
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── BookCard.js           # Book display component
│   │   │   ├── LoadingSpinner.js     # Loading component
│   │   │   ├── Modal.js              # Modal component
│   │   │   ├── Navbar.js             # Navigation (simple slide-down animation)
│   │   │   ├── Pagination.js         # Pagination component
│   │   │   ├── ProtectedRoute.js     # Route protection
│   │   │   ├── RatingChart.js        # Rating distribution chart
│   │   │   ├── ReviewForm.js         # Review creation/editing
│   │   │   ├── ReviewList.js         # Reviews display
│   │   │   └── SearchFilter.js       # Search and filter functionality
│   │   ├── context/                  # React Context providers
│   │   │   └── AuthContext.js        # Authentication state management
│   │   ├── pages/                    # Main application pages
│   │   │   ├── AddBook.js            # Add new book form
│   │   │   ├── BookDetails.js        # Book details with reviews
│   │   │   ├── EditBook.js           # Edit book form
│   │   │   ├── Home.js               # Book list with pagination
│   │   │   ├── Login.js              # User login form
│   │   │   ├── Profile.js            # User profile with books/reviews
│   │   │   └── Register.js           # User registration form
│   │   ├── App.js                    # Main app component with routing
│   │   ├── index.css                 # Global styles (beginner-friendly)
│   │   └── index.js                  # React app entry point
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── package.json                  # Frontend dependencies
├── API_DOCUMENTAION.md               # API documentation
├── ASSIGNMENT_SUMMARY.md             # Detailed completion report
├── Book_Review_Platform.postman_collection.json  # API testing collection
├── package.json                      # Root package.json for scripts
└── README.md                         # Project documentation
```

## 🏆 **Completion Status**

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| User Authentication | ✅ Complete | JWT + bcrypt + middleware |
| Book CRUD Operations | ✅ Complete | Full CRUD with validation |
| Review System | ✅ Complete | Ratings + text + ownership |
| Frontend Pages | ✅ Complete | All 6 required pages |
| Database Schema | ✅ Complete | User/Book/Review relations |
| Pagination | ✅ Complete | 5 books per page |
| Search & Filter | ✅ Complete | Multi-field search |
| Charts | ✅ Complete | Rating distribution |
| Clean Code | ✅ Complete | Beginner-friendly structure |
| API Documentation | ✅ Complete | Postman collection |
| Deployment Guide | ✅ Complete | Step-by-step instructions |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ for book lovers by Yash Pandav.

---

**Happy Reading and Coding! 📚✨**
