# 🚀 CLEVER-DASH: React Admin Dashboard

A modern, full-stack **Admin Dashboard** built using **React**, **Material UI**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**. It includes powerful features like dynamic data visualization, secure CRUD operations, responsive UI, and a fully customizable theming system (light/dark mode).

---

## 📚 Table of Contents

* [✨ Features](#-features)
* [📁 Project Structure](#-project-structure)
* [🛠️ Tech Stack](#-tech-stack)
* [🚀 Getting Started](#-getting-started)

  * [🔧 Prerequisites](#-prerequisites)
  * [📦 Installation](#-installation)
  * [▶️ Running the Application](#-running-the-application)
* [🌐 Frontend Overview](#-frontend-overview)
* [🖥️ Backend Overview](#-backend-overview)
* [📡 API Endpoints](#-api-endpoints)
* [🧪 Sample Data](#-sample-data)
* [🎨 Customization](#-customization)
* [📄 License](#-license)
* [🙏 Acknowledgements](#-acknowledgements)

---

## ✨ Features

* 🔐 **User Authentication** (via mock JSON server)
* 📊 **Dashboard** with live charts and recent transactions
* 👥 **Team Management** (CRUD for team members)
* 📇 **Contacts Management**
* 🧾 **Invoices CRUD**
* 📦 **Product Catalog**
* 📅 **Calendar** with event scheduling
* 📈 **Data Visualization** (Bar, Line, Pie, Geography)
* 🌗 **Light/Dark Mode** toggle
* 🖨️ **PDF/PNG Export** for charts and reports
* 💎 **Responsive UI** with Material UI & custom theming

---

## 📁 Project Structure

```
CLEVER-DASH-2/
├── Client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── data/             # Mock data for charts and tables
│   │   ├── scenes/           # Main pages (dashboard, team, etc.)
│   │   ├── state/            # Redux Toolkit API slice and store
│   │   ├── theme.js          # Theme configuration and toggling logic
│   │   └── App.js            # Main entry point
│   └── public/               # Static assets
└── Server/                   # Node.js backend
    ├── controllers/          # Business logic for each route
    ├── models/               # Mongoose schemas
    ├── routes/               # Express route definitions
    ├── index.js              # Entry point (legacy)
    └── server.js             # Main server entry
```

---

## 🛠️ Tech Stack

### Frontend:

* React 18
* Material UI 5
* Redux Toolkit + RTK Query
* React Router DOM
* Charting: Nivo, Chart.js, FullCalendar
* Formik + Yup for forms
* Notifications: SweetAlert2, React-Toastify
* Exporting: jsPDF, html2canvas

### Backend:

* Node.js, Express
* MongoDB, Mongoose
* CORS, Helmet, Morgan
* dotenv for env config

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* MongoDB Atlas account or local MongoDB instance

---

### 📦 Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/Subhapreet21/CLEVER-DASH.git
cd CLEVER-DASH-2
```

2. **Install Dependencies:**

Frontend:

```bash
cd Client
npm install
```

Backend:

```bash
cd ../Server
npm install
```

---

### ▶️ Running the Application

1. **Start Backend Server:**

```bash
cd Server
npm start
```

* Runs on: [http://localhost:9000](http://localhost:9000)

2. **Start Frontend App:**

```bash
cd ../Client
npm start
```

* Runs on: [http://localhost:3000](http://localhost:3000)

3. **(Optional) Start JSON Auth Server:**

```bash
npm run server
```

* Mock auth server on: [http://localhost:3547](http://localhost:3547)

---

## 🌐 Frontend Overview

* **Authentication** with mock JSON server
* **Dashboard**: Summary cards, charts, recent transactions
* **Sidebar/Topbar**: Navigation + dark/light theme toggle
* **Pages**: Dashboard, Team, Contacts, Invoices, Products, Calendar, FAQ, Charts
* **State Management** via Redux Toolkit & RTK Query
* **Theming** with custom token-based system

---

## 🖥️ Backend Overview

* RESTful Express API with endpoints for:

  * Team
  * Contacts
  * Invoices
  * Products
  * Calendar
* MongoDB + Mongoose for data storage
* Secure with CORS, Helmet
* `.env` file for sensitive data like MongoDB URI

---

## 📡 API Endpoints

**Base URL:** `http://localhost:9000`

| Resource | POST (Create) | GET (Read)                        | PUT (Update)         | DELETE               |
| -------- | ------------- | --------------------------------- | -------------------- | -------------------- |
| Team     | `/addMember`  | `/getMembers`, `/getMember/:id`   | `/updateMember/:id`  | `/deleteMember/:id`  |
| Contacts | `/addContact` | `/getContacts`, `/getContact/:id` | `/updateContact/:id` | `/deleteContact/:id` |
| Invoices | `/addInvoice` | `/getInvoices`, `/getInvoice/:id` | `/updateInvoice/:id` | `/deleteInvoice/:id` |
| Products | `/addProduct` | `/getProducts`, `/getProduct/:id` | `/updateProduct/:id` | `/deleteProduct/:id` |
| Calendar | `/addEvent`   | `/getEvents`, `/getEvent/:id`     | `/updateEvent/:id`   | `/deleteEvent/:id`   |

* All endpoints use JSON.
* Check `Server/server.js` or `routes/` folder for full definitions.

---

## 🧪 Sample Data

Frontend mock data is located in:

```js
Client/src/data/mockData.js
```

Example Team Member:

```json
{
  "id": 1,
  "name": "Jon Snow",
  "email": "jonsnow@gmail.com",
  "age": 35,
  "phone": "(665)121-5454",
  "accessLevel": "admin"
}
```

---

## 🎨 Customization

* **MongoDB URI:**
  Edit the connection string in `Server/index.js` or `.env`.

* **Ports:**
  Change in `package.json` scripts or server files.

* **Theme Colors:**
  Customize in `Client/src/theme.js`.

* **Branding/Assets:**
  Replace files in `Client/public/assets/`.

---

## 📄 License

> This project is currently unlicensed. You can add an open-source license (e.g., MIT) depending on your usage needs.

---

## 🙏 Acknowledgements

* [Material UI](https://mui.com/)
* [Nivo Charts](https://nivo.rocks/)
* [FullCalendar](https://fullcalendar.io/)
* [JS Mastery - React Admin Dashboard](https://www.youtube.com/watch?v=wYpCWwD1oz0)

---
