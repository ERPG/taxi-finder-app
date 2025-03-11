# 🚖 Taxi Vehicle Locator

This application displays vehicles on a **map** and a **table**, allowing users to interact with vehicle markers and sort the listings. this showcase state management at feature level.

## ✨ Features

- 📍 **Map & Table Integration**: Vehicles are displayed on both a map (Leaflet) and a table.
- 🔍 **Sorting & Pagination**: Vehicles are sorted by license plate and paginated (10 per page).
- 🎯 **Interactive Selection**: Clicking a table row highlights the corresponding map marker, and vice versa.
- ⚡ **Fast Performance**: Uses **React Query** for efficient data fetching and caching.
- 🛠 **Backend with Node.js & Express**: Serves vehicle data from JSON files.
- ✅ **Testing with Vitest & React Testing Library**: Ensures component reliability.

---

## 🚀 Setup & Installation

```
git clone https://github.com/ERPG/taxi-finder-app
cd taxi-finder-app
```

### 1️⃣ Install dependencies and start project

Start the backend

```
cd server/
npm i
npm start
```

Go back to root and start the client

```
npm i
npm start
```

### 2️⃣ Run tests

```
npm test
```

## 📌 Tech Stack

•	Frontend: React, Vite, React Query, React Leaflet, TypeScript
•	Backend: Node.js, Express, JSON data storage
•	Testing: Vitest, React Testing Library
