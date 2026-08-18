# 🚀 The Subreddit Vibe Check

**The Subreddit Vibe Check** is an industry-level full-stack dashboard built for the Full Stack Developer Internship take-home assignment. It fetches the top 50 "Hot" posts of any subreddit using Reddit's API and performs client & server-side NLP sentiment analysis to calculate an overall "Vibe Check" score, sentiment spectrum distribution, and highlighted positive/negative posts.

---

## 📁 Project Architecture & Folder Structure

Following strict enterprise naming conventions (`*.model.ts`, `*.controller.ts`, `*.service.ts`, `*.routes.ts`):

```
subreddit-vibe-check/
├── server/                        # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── subreddit.controller.ts  # Subreddit API request handlers & endpoints
│   │   │   └── user.controller.ts       # Candidate submission handlers
│   │   ├── models/
│   │   │   ├── subreddit.model.ts      # Reddit post & Vibe analysis TypeScript interfaces
│   │   │   └── user.model.ts           # Candidate submission user model
│   │   ├── services/
│   │   │   ├── reddit.service.ts       # Fetching 50 hot posts with headers, RSS & fallbacks
│   │   │   └── sentiment.service.ts    # NLP Sentiment score & word analyzer
│   │   ├── routes/
│   │   │   ├── subreddit.routes.ts     # /api/subreddit routes
│   │   │   └── user.routes.ts          # /api/user routes
│   │   ├── middleware/
│   │   │   └── error.middleware.ts     # Global try/catch error handling
│   │   └── server.ts                   # Express app server entry point
│   ├── package.json
│   └── tsconfig.json
├── client/                        # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SubredditSearch.tsx # Interactive search bar & trending pills
│   │   │   ├── VibeHeader.tsx      # Subreddit status header & overall vibe badge
│   │   │   ├── VibeSummaryCard.tsx # Metric cards (Positive%, Neutral%, Negative%)
│   │   │   ├── SentimentChart.tsx  # Recharts Pie & Bar visualizations
│   │   │   ├── PostList.tsx        # Filterable & sortable 50 posts table
│   │   │   └── SubmissionGuideModal.tsx # Step 1 & 3 Email Submission assistant
│   │   ├── services/
│   │   │   └── api.service.ts      # Typed client API fetcher with try/catch
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript interfaces
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

### 2. Run Applications

**Start Backend API Server (Port 5000):**
```bash
cd server
npm run dev
```

**Start Frontend Development Dashboard (Port 3000):**
```bash
cd client
npm run dev
```

Access the dashboard in your browser at `http://localhost:3000`.

---

## 📋 Assignment Steps & Submission Checklist

### Step 1: Account Setup & API Exploration
1. **Guerrilla Mail**: Create a temporary email address at [Guerrilla Mail](https://www.guerrillamail.com).
2. **Reddit Account**: Use the temp email to sign up on [Reddit Registration](https://www.reddit.com/register). Verify the account using the verification code received on Guerrilla Mail.
3. **Reddit API Exploration**: The endpoint `/r/{subreddit}/hot.json?limit=50` is queried to extract top 50 hot posts.

### Step 2: Core Dashboard Features
- **Subreddit Fetching**: Input any subreddit (e.g. `technology`, `javascript`, `gaming`, `wallstreetbets`).
- **Sentiment Analysis**: Analyzes titles of all 50 posts, calculates compound scores, comparative ratings, and categorizes into `Positive`, `Neutral`, or `Negative`.
- **Interactive Visualizations**: Displays percentage breakdown pie chart and post sentiment spectrum bar chart using Recharts.
- **Filter & Sort**: Filter posts by sentiment category or sort by hot rank, upvotes, or sentiment scores.

### Step 3: Submission Instructions
Send an email to **sportsorcateam@gmail.com** with the following format (or click **Submission Assistant** in the dashboard header):

```text
Subject: Take-Home Assignment Submission - Full Stack Developer Internship

a) Reddit Username: [Your Created Reddit Username]
b) Email Used: [Your Guerrilla Mail Address]
c) Project Link: [Link to Live Hosted Dashboard]
d) Source Code: [Link to Public GitHub Repository]
```
