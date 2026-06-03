# App Store Reviews Viewer

A small full-stack application that fetches, stores, and displays recent iOS App Store reviews using Apple's RSS feeds.

---

## 🚀 Features

### Backend

- Polls Apple App Store RSS feeds every 60 seconds
- Stores reviews in persistent JSON storage (survives restart)
- Deduplicates reviews by ID
- Handles multiple apps
- Normalizes RSS data into internal DTO format

### Frontend (React)

- Displays list of apps
- Shows reviews per app
- Displays:
  - author
  - content
  - rating
  - submission date (localized)

---

## 🏗 Architecture

Backend:

- poller.ts → fetch + merge + dedupe logic
- storage.ts → file-based persistence layer

Frontend:

- pages/AppPage → apps list
- pages/ReviewsPage → reviews per app
- api → backend communication layer
- model → shared DTO types

---

## 🔄 Data Flow

1. Poller runs every 60 seconds
2. Fetches RSS feed from Apple:
   https://itunes.apple.com/us/rss/customerreviews/id={appId}/sortBy=mostRecent/page=1/json
3. Parses and normalizes review data
4. Removes duplicate reviews
5. Saves merged dataset to storage
6. Frontend fetches data from backend API

---

## 🧠 Design Decisions

- No external backend frameworks (Node.js only)
- File-based JSON storage for simplicity and persistence
- Polling approach instead of push (Apple RSS limitation)
- Single-page RSS fetch (no pagination needed)
- Focus on simplicity over overengineering

---

## ⚠️ Edge Cases Handled

- Missing or malformed RSS response
- First RSS entry is metadata (ignored)
- Duplicate reviews across polling cycles
- Empty or missing feed data
- Backend restart without data loss

---

## 🖥 Running the project

### Backend

```
cd backend
npm install
npm run start
```

### Frontend

```
cd ui
npm install
npm run dev
```

---

## 🔌 API

GET /apps
Returns list of tracked apps

GET /reviews/:appId
Returns reviews for given app

---

## 📌 Notes

- Backend is intentionally dependency-free
- Designed for simplicity and clarity under time constraints
- Focus on maintainability and clear data flow

## ⚖️ Trade-offs & Design Decisions

### No backend framework (Express/Fastify)

I intentionally avoided using frameworks like Express to keep the backend lightweight and dependency-free.
Trade-off: more manual HTTP handling, but improved transparency and control over the system.

---

### File-based storage instead of database

I used JSON file storage instead of a database to simplify the solution.
Trade-off: limited scalability and concurrency handling, but sufficient for the scope of this assignment.

---

### Polling instead of push-based updates

Apple App Store RSS does not provide push notifications, so polling was used.
Trade-off: slightly higher resource usage, but predictable and simple architecture.

---

### No pagination

The RSS feed already returns the most recent reviews, and the system scope is limited to a 48-hour window.
Trade-off: less flexibility for historical data, but significantly reduced complexity.

---

### Minimal external dependencies

Most functionality is implemented using Node.js standard libraries.
Trade-off: more manual implementation effort, but easier to review, understand, and audit.

---

### Simple deduplication strategy

Reviews are deduplicated using an in-memory Map keyed by review ID.
Trade-off: not distributed-safe, but sufficient for a single-instance backend.

## 💾 Data Storage

The application uses a simple file-based storage approach located in the data/ directory.

- apps.json → stores list of tracked apps and metadata
- reviews/{appId}.json → stores cached reviews per app

This approach ensures:

- persistence across backend restarts
- simplicity without external dependencies
- easy debugging and manual inspection of stored data

Trade-off:

- not suitable for distributed systems
- no built-in concurrency control
- limited scalability compared to a database
