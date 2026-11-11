# 🌱 AgriTrack – Smart Farm Management System

AgriTrack is a Smart Farm Management Platform that helps farmers manage their farming activities in one place.

It helps farmers manage farms, crops, farming tasks, expenses, harvests, and sales. It also provides an AI-powered Crop Planner to create smart farming schedules.

## 🚀 Live Project

- **Frontend:** https://agri-track-sage.vercel.app
- **Backend:** https://agritrack-flki.onrender.com
- **GitHub Repository:** https://github.com/vikkikumar07/AgriTrack

## 📌 About the Project

AgriTrack is designed to make farm management easy and smart.

Farmers can manage their farm details, track farming activities, generate crop schedules using AI, record expenses, and manage harvest information.

The platform also provides an Admin Panel to manage users and farmer complaints.

## ✨ Features

### 👨‍🌾 Farmer Features
- User Registration and Login
- Secure Authentication
- Manage Farm Details
- Add and Manage Crops
- Track Farming Tasks
- Automatic Farming Task Planning
- AI-Based Crop Planner
- AI Chat Assistant
- Manage Farm Expenses
- Track Harvest and Sales
- Update User Profile
- Submit Complaints

### 👨‍💼 Admin Features
- Admin Dashboard
- Manage Users
- View Farmer Details
- Manage Farmer Complaints
- Update Complaint Status

### 🤖 AI Features
- AI-Based Crop Planning
- Crop-Specific Farming Schedules
- Automatic Task Suggestions
- AI Chat Assistant

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Redux Toolkit
- Axios
- React Router
- Lucide React

### Backend
- Node.js
- Express.js
- JavaScript
- REST APIs
- JWT Authentication
- Bcrypt

### Database
- MongoDB
- Mongoose

### AI and Cloud Services
- Google Gemini AI
- Cloudinary

### Deployment
- Vercel – Frontend Hosting
- Render – Backend Hosting
- MongoDB Atlas – Cloud Database
- GitHub – Source Code Management

## 📂 Project Structure

```text
AgriTrack/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   └── image/
│   │
│   └── package.json
│
└── README.md
```

## ⚙️ How to Install and Run

### 1. Clone the Repository

```bash
git clone https://github.com/vikkikumar07/AgriTrack.git
```

### 2. Open Project Folder

```bash
cd AgriTrack
```

### 3. Start Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Add your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

Add the required AI and Cloudinary credentials used by the project.

Start the backend:

```bash
npm start
```

Backend runs at:

```text
http://localhost:5000
```

### 4. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

## 📖 How to Use

1. Open the AgriTrack website.
2. Create a new account or log in.
3. Add your farm details.
4. Enter crop and farming information.
5. Use the AI Crop Planner to generate a farming schedule.
6. View and manage farming tasks.
7. Add daily farming expenses.
8. Record harvest and sales details.
9. Use the AI Chat Assistant for farming questions.
10. Manage your profile and farming activities.

**Admin:** Admin users can manage registered users and farmer complaints through the Admin Panel.

## 🎯 Why Use AgriTrack?

- Easy farm management.
- Saves time and effort.
- Helps farmers plan farming activities.
- Provides AI-based crop planning.
- Makes expense tracking easier.
- Helps manage harvest and sales records.
- Keeps farming information organized.
- Provides all important farm management features in one platform.

## 🔐 Security

- Secure user authentication.
- JWT-based authorization.
- Password hashing using Bcrypt.
- Protected API routes.
- Role-based access for farmers and admins.

## 🔮 Future Improvements

- Weather Forecast Integration.
- Live Market Price Updates.
- Crop Disease Detection.
- Smart Irrigation Suggestions.
- Advanced Farm Analytics.
- Mobile Application.

## 👨‍💻 Developer

**Vikki Kumar**

- GitHub: https://github.com/vikkikumar07

## ⭐ Support

If you like this project, please give it a star ⭐ on GitHub.

Thank you for visiting AgriTrack!
