# 🏨 Hotel Booking System

A **full-stack hotel booking system** built with **React (Vite + TypeScript)**, **Redux Toolkit Query**, **Node.js**, **Express**, and **MongoDB**.  
This project allows users to browse rooms, check availability, create bookings, and view booking summaries with a responsive and modern UI.

---
## 🌍 Live Demo

- 🔗 **Frontend (Vercel):** [Hotel Booking Frontend](https://haque-digital-frontend.vercel.app/)  
- 🔗 **Backend API (Vercel):** [Hotel Booking API](https://haque-digital-backend.vercel.app/api)  


## 🚀 Features

### Frontend (React + Vite + TypeScript)
- 📱 **Responsive Design** (Desktop + Mobile views)
- 🎨 **Framer Motion animations**
- 🔄 **RTK Query** for API state management
- 🛏 **Room listing with pagination**
- 📖 **Booking summary table & mobile cards**
- ⏳ **Loading animations**
- 🔐 **Environment-based API handling**

### Backend (Node.js + Express)
- 🗄 **MongoDB with Mongoose**
- 🔑 **Room CRUD APIs**
- 📑 **Booking APIs (create + summary)**
- 🛡 **Global error handler**
- 🌍 **CORS configuration with allowed origins**
- 🍪 **Cookie parser for authentication**

------

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/your-username/hotel-booking-system.git
cd project


npm install
npm run dev
```
### Future Improvements 
``` 
🔐 User authentication (JWT)
📆 Booking calendar view
💳 Payment integration
👤 Admin dashboard for room & booking management

```
## 📂 Project Structure
```
src
 ┣ Layout
 ┃ ┗ MainLayout.tsx
 ┣ assets
 ┃ ┗ react.svg
 ┣ components
 ┃ ┣ ui
 ┃ ┃ ┗ Loading.tsx
 ┃ ┣ Footer.tsx
 ┃ ┣ Hero.tsx
 ┃ ┗ Navbar.tsx
 ┣ interface
 ┃ ┗ BookingSummary.ts
 ┣ pages
 ┃ ┣ BookingSummary.tsx
 ┃ ┣ Contact.tsx
 ┃ ┣ CreateRoom.tsx
 ┃ ┣ Home.tsx
 ┃ ┗ Rooms.tsx
 ┣ redux
 ┃ ┣ api
 ┃ ┃ ┗ api.ts
 ┃ ┗ store.ts
 ┣ routes
 ┃ ┗ route.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts