# Event Management and Resource Allocation Platform

A **full-stack web application** for managing events, allocating resources, and streamlining collaboration between planners, staff, and clients.  
Built with **MERN stack (MongoDB, Express.js, React.js, Node.js)** for the frontend and **Spring Boot (with JPA, JWT, and MySQL)** for the backend.  

---

## 🚀 Features

### 🔑 Authentication & Authorization
- Role-based access (PLANNER, STAFF, CLIENT)
- Secure login & registration with JWT (stored in HttpOnly cookies)
- Role-specific dashboards and navigation

### 📅 Event Management
- Create, update, and delete events (Planner role)
- View upcoming and past events
- Client-side booking of events
- Staff assignment and event progress tracking

### ⚙️ Resource Allocation
- Fetch all staff members from database
- Assign staff to events (one staff per event at a time)
- Staff can mark events as **completed**
- Resource availability management

### 📊 Dashboard
- Separate dashboards for Planner, Staff, and Client
- Event and resource summary with status updates
- Role-based UI and actions

### 🛠️ Additional Features
- Secure REST APIs with Spring Boot & JWT
- Data persistence using **MySQL (backend)** and **MongoDB (frontend storage if needed)**
- Fully responsive frontend with **React + Tailwind CSS**
- Robust error handling and validation

---

## 🏗️ Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation
- JWT Authentication (via cookies)

### Backend
- **Spring Boot** (REST APIs)
- **Spring Security + JWT**
- **Spring Data JPA** with MySQL
- **Maven** for dependency management

### Database
- **MySQL** – Backend relational database
- **MongoDB** – Optional NoSQL support for logging & extra data

---

## 📂 Project Structure

```bash
.
├── backend/               # Spring Boot backend
│   ├── src/main/java/     # Java source code
│   ├── src/main/resources # Application properties
│   └── pom.xml            # Maven dependencies
│
├── frontend/              # React frontend
│   ├── src/               # Components, pages, services
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
│
└── README.md              # Project documentation
