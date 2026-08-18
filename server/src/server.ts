import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Subreddit Vibe Check API Server running on port ${PORT}`);
});
