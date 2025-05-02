# Semantic Search Engine

A full-stack application that provides semantic search capabilities using vector similarity and TF-IDF. The project consists of a Node.js/Express backend API and a React frontend.

## Features

- 🔍 Semantic search using TF-IDF vectorization and cosine similarity
- 📝 Document management with CRUD operations
- 🔐 User authentication system
- ⚡ Real-time search results with relevance scoring
- 📊 Text preprocessing including tokenization, stemming, and stopword removal
- 🎯 Advanced result ranking combining vector similarity and text matching

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Natural.js for NLP
- JWT for authentication
- Docker support

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

## Project Structure

```
semantic-search-api/
├── src/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── .env                 # Environment variables
└── package.json         # Dependencies

semantic-search-frontend/
└── src/
    ├── components/      # React components
    ├── lib/            # Utility functions
    └── App.js          # Main app component
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jan123GAN/vector_search_frontend.git
cd semantic-search
```

2. Install backend dependencies:
```bash
cd semantic-search-api
npm install
```

3. Set up environment variables:
Create a .env file in the semantic-search-api directory:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

4. Install frontend dependencies:
```bash
cd ../semantic-search-frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd semantic-search-api
npm run dev
```

2. Start the frontend development server:
```bash
cd semantic-search-frontend
npm run dev
```

## API Endpoints

### Documents
- `POST /api/documents` - Create a new document
- `GET /api/documents` - Get all documents
- `POST /api/documents/search` - Search documents
- `GET /api/documents/:id` - Get specific document

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Search Implementation

The search functionality combines multiple approaches for optimal results:

1. Vector Similarity (70% weight)
   - Documents are vectorized using TF-IDF
   - Search queries are compared using cosine similarity

2. Text Matching (30% weight)
   - Direct text matching in title and content
   - Partial word matching

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Natural.js library for NLP capabilities
- MongoDB for database operations
- Express.js for API framework
