<div align="center">
  <h1>🪙 สบายจ่าย (SabaaiJai) - Smart Expense Tracker</h1>
  <p><em>AI-Powered Personal Finance Management with OCR Receipt Scanning</em></p>
  
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud">
</div>

---

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📱 Frontend (Next.js)](#-frontend-nextjs)
- [🔧 Backend (FastAPI)](#-backend-fastapi)
- [🤖 AI Integration](#-ai-integration)
- [🔒 Security Features](#-security-features)
- [📁 Project Structure](#-project-structure)
- [🐳 Docker Setup](#-docker-setup)
- [📚 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## 🌟 Features

### 💰 Core Financial Management

- **📊 Expense Tracking**: Add, edit, and categorize your expenses
- **💵 Income Management**: Track multiple income sources
- **📈 Financial Reports**: Detailed analytics and spending insights
- **🏷️ Category Management**: Organize expenses by custom categories

### 🤖 AI-Powered Features

- **📷 OCR Receipt Scanning**: Extract data from receipt photos using Google Vision API
- **💡 Smart Recommendations**: Personalized financial advice powered by Google Gemini
- **🚌 Travel Optimization**: Route suggestions for cheaper transportation
- **🍽️ Spending Insights**: AI analysis of spending patterns

### 🔐 Security & Performance

- **🔒 JWT Authentication**: Secure user authentication and authorization
- **🛡️ Input Validation**: Comprehensive data validation using Pydantic
- **⚡ Rate Limiting**: Protection against abuse and DDoS attacks
- **🔐 Password Hashing**: Secure password storage with Bcrypt

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Next.js Frontend] --> B[FastAPI Backend]
    B --> C[PostgreSQL Database]
    B --> D[Google Vision API]
    B --> E[Google Gemini AI]
    B --> F[Redis Cache]
    A --> G[Tailwind CSS]
    B --> H[SQLAlchemy ORM]
```

**Tech Stack:**

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.10+, SQLAlchemy, Pydantic
- **Database**: PostgreSQL with Redis for caching
- **AI Services**: Google Cloud Vision (OCR), Google Gemini (LLM)
- **DevOps**: Docker, Docker Compose

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required software
- Node.js 18+ and npm/yarn/pnpm
- Python 3.10+
- Docker and Docker Compose
- Google Cloud Account (for AI services)
```

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sabaaijai-app.git
cd sabaaijai-app
```

### 2. Setup Environment Variables

#### Frontend (.env.local)

```bash
# Frontend environment variables
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

#### Backend (.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@db:5432/sabaaijai_db

# JWT Security
SECRET_KEY=your_super_secret_jwt_key_change_in_production
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

# Google Cloud AI
GOOGLE_CLOUD_PROJECT_ID=your-gcp-project-id
GOOGLE_APPLICATION_CREDENTIALS_PATH=/app/google-service-account-key.json
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Start with Docker Compose

```bash
# Start all services (Frontend, Backend, Database)
docker-compose up -d

# View logs
docker-compose logs -f
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## 📱 Frontend (Next.js)

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── layout.tsx         # Global layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Generic UI components
│   ├── features/         # Feature-specific components
│   └── common/           # Shared layout components
├── hooks/                # Custom React hooks
├── services/             # API service layer
├── lib/                  # Utilities and configurations
└── styles/               # CSS and styling
```

### Key Features

#### 🎨 Modern UI Components

```typescript
// Example: Reusable Button Component
import { Button } from "@/components/ui/Button";

<Button
  variant="primary"
  size="large"
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Add Expense
</Button>;
```

#### 🔄 Smart State Management

```typescript
// Custom hook for expenses
const { expenses, loading, error, addExpense } = useExpenses();
```

#### 🚀 Optimized Performance

- Server-side rendering with Next.js App Router
- Automatic code splitting and lazy loading
- Image optimization and responsive design

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check
```

---

## 🔧 Backend (FastAPI)

### Project Structure

```
app/
├── main.py                # FastAPI application entry point
├── core/                  # Core configurations
│   ├── config.py         # Environment settings
│   ├── security.py       # Authentication utilities
│   └── dependencies.py   # Dependency injection
├── models/               # SQLAlchemy ORM models
├── schemas/              # Pydantic validation schemas
├── services/             # Business logic layer
├── api/v1/              # API endpoints
└── utils/               # Utility functions
```

### API Endpoints

#### 🔐 Authentication

```
POST /api/v1/auth/register    # User registration
POST /api/v1/auth/login       # User login
GET  /api/v1/auth/me          # Get current user
POST /api/v1/auth/logout      # User logout
```

#### 💰 Expenses

```
GET    /api/v1/expenses       # List expenses
POST   /api/v1/expenses       # Create expense
GET    /api/v1/expenses/{id}  # Get expense details
PUT    /api/v1/expenses/{id}  # Update expense
DELETE /api/v1/expenses/{id}  # Delete expense
```

#### 🤖 AI Services

```
POST /api/v1/ai/ocr/receipt      # OCR receipt scanning
POST /api/v1/ai/recommendations  # Get AI recommendations
```

### Development Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run database migrations
alembic upgrade head

# Run tests
pytest

# Code formatting
black app/
pylint app/
```

---

## 🤖 AI Integration

### OCR Receipt Scanning

```python
# Upload and process receipt
result = await ai_service.process_receipt_ocr(receipt_image)
# Returns: {totalAmount, merchantName, date, items}
```

### Smart Financial Recommendations

```python
# Get personalized recommendations
recommendations = await ai_service.get_financial_recommendations(
    user_id=current_user.id,
    spending_data=user_spending_summary
)
```

### Google Cloud Setup

1. **Create Google Cloud Project**
2. **Enable APIs**:
   - Cloud Vision API
   - Generative AI API
3. **Create Service Account** and download JSON key
4. **Set environment variables** with your credentials

---

## 🔒 Security Features

### 🛡️ Authentication & Authorization

- **JWT Tokens**: Secure stateless authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Role-based Access**: User permissions and access control

### 🔍 Input Validation

- **Pydantic Schemas**: Comprehensive request/response validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents injection attacks
- **XSS Protection**: Input sanitization and validation

### 🚦 Rate Limiting

```python
# Example rate limiting configuration
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Limit: 100 requests per minute per IP
    return await rate_limiter.check_rate_limit(request, call_next)
```

### 🔐 Environment Security

- Environment variables for sensitive data
- CORS configuration for allowed origins
- HTTPS enforcement in production

---

## 📁 Project Structure

<details>
<summary>📂 Complete Folder Structure</summary>

```
sabaaijai-app/
├── 📁 frontend/                    # Next.js Frontend
│   ├── 📁 src/
│   │   ├── 📁 app/                # App Router pages
│   │   ├── 📁 components/         # React components
│   │   ├── 📁 hooks/             # Custom hooks
│   │   ├── 📁 services/          # API services
│   │   ├── 📁 lib/               # Utilities
│   │   └── 📁 styles/            # CSS files
│   ├── 📄 package.json
│   ├── 📄 next.config.js
│   ├── 📄 tailwind.config.ts
│   └── 📄 .env.local
│
├── 📁 backend/                     # FastAPI Backend
│   ├── 📁 app/
│   │   ├── 📄 main.py            # FastAPI app
│   │   ├── 📁 core/              # Core configurations
│   │   ├── 📁 models/            # Database models
│   │   ├── 📁 schemas/           # Pydantic schemas
│   │   ├── 📁 services/          # Business logic
│   │   ├── 📁 api/               # API routes
│   │   └── 📁 utils/             # Utilities
│   ├── 📄 requirements.txt
│   ├── 📄 Dockerfile
│   └── 📄 .env
│
├── 📄 docker-compose.yml           # Docker services
├── 📄 README.md                   # This file
└── 📁 docs/                       # Documentation
    ├── 📄 api.md                  # API documentation
    ├── 📄 deployment.md           # Deployment guide
    └── 📄 contributing.md         # Contribution guide
```

</details>

---

## 🐳 Docker Setup

### Full Stack Development

```yaml
# docker-compose.yml
version: "3.8"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api/v1
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/sabaaijai_db
    depends_on:
      - db
      - redis

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=sabaaijai_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Commands

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f [service_name]

# Stop all services
docker-compose down

# Reset database
docker-compose down -v
```

---

## 📚 API Documentation

### Interactive Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Example API Usage

#### Authentication

```bash
# Register new user
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "first_name": "John",
    "last_name": "Doe"
  }'

# Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

#### Expense Management

```bash
# Create expense with OCR
curl -X POST "http://localhost:8000/api/v1/ai/ocr/receipt" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@receipt.jpg"

# Add expense
curl -X POST "http://localhost:8000/api/v1/expenses" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 150.50,
    "category": "Food",
    "description": "Lunch at restaurant",
    "date": "2024-01-15"
  }'
```

---

## 🧪 Testing

### Frontend Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Backend Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_auth.py

# Run tests in watch mode
pytest-watch
```

### Test Structure

```
tests/
├── 📁 frontend/
│   ├── 📁 components/       # Component tests
│   ├── 📁 hooks/           # Hook tests
│   ├── 📁 services/        # Service tests
│   └── 📁 e2e/             # End-to-end tests
└── 📁 backend/
    ├── 📁 api/             # API endpoint tests
    ├── 📁 services/        # Service layer tests
    └── 📁 models/          # Database model tests
```

---

## 🚀 Deployment

### Production Environment

#### Frontend (Vercel)

```bash
# Deploy to Vercel
npm run build
vercel --prod
```

#### Backend (Google Cloud Run)

```bash
# Build and deploy
gcloud run deploy sabaaijai-backend \
  --source . \
  --platform managed \
  --region asia-southeast1
```

#### Database (Google Cloud SQL)

```bash
# Create PostgreSQL instance
gcloud sql instances create sabaaijai-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=asia-southeast1
```

### Environment Variables (Production)

```bash
# Frontend
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api/v1

# Backend
DATABASE_URL=postgresql://user:password@your-db-host:5432/sabaaijai_db
SECRET_KEY=your_production_jwt_secret_key
GOOGLE_CLOUD_PROJECT_ID=your-gcp-project
GEMINI_API_KEY=your_production_gemini_key
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test && pytest
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request**

### Code Style

- **Frontend**: ESLint + Prettier
- **Backend**: Black + Pylint
- **Commits**: Conventional Commits

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation**: [Full Documentation](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/sabaaijai-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/sabaaijai-app/discussions)

---

<div align="center">
  <p>Made with ❤️ by the SabaaiJai Team</p>
  <p>
    <a href="#-table-of-contents">Back to Top ⬆️</a>
  </p>
</div>
