# 📘 Ginger Media Campaign Tracker

## 🧩 Project Overview
The **Ginger Media Campaign Tracker** is a full-stack web application designed to manage, monitor, and evaluate marketing campaigns efficiently.  
It allows marketing teams to create campaigns, store client data, and visualize campaign progress through an interactive dashboard. The system integrates a Node.js backend with a responsive HTML/JS frontend to provide real-time tracking and analytics.

**Main Goals:**
- Streamline campaign management and reporting.  
- Provide real-time campaign status visibility.  
- Simplify collaboration between teams and clients.  
- Enhance decision-making with campaign data analytics.

---

## 📂 Project Structure
```
CAMPAIGN-TRACKER/
│
├── backend/                     # Backend (Node.js + Express)
│   ├── models/
│   │   └── campaignModel.js     # Mongoose schema for campaign data
│   ├── compaignRoutes.js        # API routes for campaign operations
│   ├── db.js                    # Database connection setup (MongoDB)
│   ├── server.js                # Main server entry point
│   ├── package.json             # Backend dependencies
│   └── package-lock.json
│
├── frontend/                    # Frontend setup (React or other framework)
│   ├── src/                     # Frontend source code
│   └── package.json             # Frontend dependencies
│
├── mock-frontend/               # Static HTML/CSS/JS mockup for UI testing
│   ├── index.html               # Homepage layout
│   ├── login.html               # Login page
│   ├── dashboard.js             # Dashboard logic
│   ├── login.js                 # Login validation script
│   ├── script.js                # General JavaScript utilities
│   ├── style.css                # Main styling file
│   └── login.css                # Login page styling
│
├── 1234                         # Configuration or key file
├── 1234.pub                     # Public key
└── README.md                    # Project documentation
```

---

## 🚀 Features
- **User Authentication:** Login system for secure access.  
- **Campaign Management:** Add, edit, and delete campaigns with key metrics.  
- **Dashboard View:** Visual representation of campaign performance.  
- **Database Integration:** MongoDB for storing campaign details.  
- **Responsive Frontend:** Designed using HTML, CSS, and JavaScript.  
- **API-based Communication:** RESTful APIs between frontend and backend.  
- **Modular Structure:** Clean separation of backend, frontend, and mock UI.  

---

## 🛠️ Technology Used
| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript | Used for UI design and client-side interactivity |
| **Backend** | Node.js, Express.js | Handles API requests and server logic |
| **Database** | MongoDB, Mongoose | Stores and retrieves campaign information |
| **Version Control** | Git | Used for source code management |
| **Development Tools** | VS Code, npm | IDE and package management |
