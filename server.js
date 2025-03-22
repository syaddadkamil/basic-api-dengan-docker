import express from "express";
import dotenv from "dotenv";
import { limiter, trackRequest } from "./src/ratelimit.js";
import metadata from "./src/metadata.js";
import statusMiddleware from "./src/status.js";
import { info, warn, error } from "./src/logger.js";

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT;
const name = process.env.NAME;

info(`App started on port ${port} with name ${name}`);

// trackRequest
app.use(trackRequest);

// limiter
app.use(limiter);

// homepage api
app.get("/", (req, res) => {
  info("Request received on route /");
  res.send(`Hello ${name}! | PORT ${port}`);
});

// metadata
app.get("/metadata", (req, res) => {
  info("Request received on route /metadata");
  metadata(req, res);
});

// bad request handler & middleware
app.get("/status", (req, res) => {
  warn(
    `Warning: User with IP ${
      req.ip
    } has accessed /status Date ${new Date().toISOString()}`
  );
  statusMiddleware(req, res);
});

// Error Handler
app.use((req, res, next) => {
  const err = new Error("Bad Request: Request URL failed");
  err.status = 400;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.status === 400) {
    err(`Bad Request: ${err.message} | URL: ${req.originalUrl}`);
    res.status(400).json({ error: err.message });
  } else {
    error(`There is an error: ${err.message}`);
    res.status(500).json({ error: err.mesage || "A server error occurred" });
  }
});

// Logging middleware every request
app.use((req, res, next) => {
  info(`Request ${req.method} ${req.originalUrl} received `);
  next();
});

// Server Listen
app.listen(port, () => {
  info(`Server running on port ${port}`);
});