const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const dotenv = require("dotenv").config();
const express = require("express");
const path = require('path');
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
// Simple CORS middleware to allow frontend dev server access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// API routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend static files (built by Render during deploy)
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(distPath));

// For any non-API route, serve index.html so the SPA router can handle it
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handler
app.use(errorHandler);

// Connect to DB and start server
connectDb();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});