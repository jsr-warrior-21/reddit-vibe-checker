# 🚀 Subreddit Vibe Check

**Subreddit Vibe Check** is an industry-level full-stack web application designed for real-time Reddit sentiment analysis. It fetches the top 50 "Hot" posts of any subreddit using Reddit's API and performs client & server-side NLP sentiment analysis to calculate an overall "Vibe Check" score, sentiment spectrum distribution, and highlighted post sentiment quotes.

---

## 🌐 Live Links

- **Live Frontend Dashboard**: [https://reddit-vibe-checker.vercel.app](https://reddit-vibe-checker.vercel.app)
- **Live Backend API**: [https://reddit-vibe-checker.onrender.com](https://reddit-vibe-checker.onrender.com)
- **GitHub Repository**: [https://github.com/jsr-warrior-21/reddit-vibe-checker](https://github.com/jsr-warrior-21/reddit-vibe-checker)

---

## ✨ Features

- **Real-Time Subreddit Fetching**: Input or select any subreddit (e.g., `technology`, `javascript`, `gaming`, `wallstreetbets`) to fetch top 50 hot posts.
- **NLP Sentiment Analysis Engine**: Runs sentiment analysis on post titles, evaluating positive/negative keyword density, compound sentiment scores, and overall vibe categories (*Super Positive*, *Positive*, *Neutral*, *Mixed / Controversial*, *Negative*).
- **Interactive Data Visualizations**: Renders real-time sentiment distribution pie charts and top post score spectrum bar charts powered by Recharts.
- **Filterable & Sortable Feed**: Filter posts by sentiment category (*All*, *Positive*, *Neutral*, *Negative*) and sort by hot rank, upvote count, or sentiment score.
- **Editorial Post Highlights**: Showcases the highest sentiment title and most critical title as styled quote cards with direct links to Reddit.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Node.js, Express, TypeScript, Sentiment NLP Engine, CORS preflight middleware

---

## 📁 Project Architecture & Folder Structure

```
subreddit-vibe-check/
├── server/                        # Express + TypeScript Backend API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── subreddit.controller.ts  # Subreddit API endpoint handlers
│   │   │   └── user.controller.ts       # User API endpoint handlers
│   │   ├── models/
│   │   │   ├── subreddit.model.ts      # Subreddit & sentiment TypeScript schemas
│   │   │   └── user.model.ts           # User TypeScript schemas
│   │   ├── services/
│   │   │   ├── reddit.service.ts       # Reddit API fetcher with fallbacks
│   │   │   └── sentiment.service.ts    # NLP sentiment analysis engine
│   │   ├── routes/
│   │   │   ├── subreddit.routes.ts     # Express router for /api/subreddit
│   │   │   └── user.routes.ts          # Express router for /api/user
│   │   ├── middleware/
│   │   │   └── error.middleware.ts     # Centralized error middleware
│   │   └── server.ts                   # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── client/                        # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SubredditSearch.tsx # Hero search input & popular pills
│   │   │   ├── VibeHeader.tsx      # Subreddit header & vibe status badge
│   │   │   ├── VibeSummaryCard.tsx # Metric cards & editorial quote cards
│   │   │   ├── SentimentChart.tsx  # Recharts Pie & Bar charts
│   │   │   └── PostList.tsx        # Filterable & sortable posts feed
│   │   ├── services/
│   │   │   └── api.service.ts      # Typed client API fetcher
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── App.tsx                 # Main layout & state orchestration
│   │   ├── main.tsx                # React DOM entry point
│   │   └── index.css               # Tailwind CSS directives
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

---

## ⚡ Quick Start & Development

### 1. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Run Locally

**Start Backend API Server (Port 5000):**
```bash
cd server
npm run dev
```

**Start Frontend Dashboard (Port 3000):**
```bash
cd client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
