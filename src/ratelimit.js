import rateLimit from "express-rate-limit";
import { warn, error } from "./logger.js";

const limiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  max: 5, // 5 request maximume in 15 seconds
  status: 429,
  message: "Too many request, try again after 15 seconds",
  handler: (req, res) => {
    error(`Too many requst from ${req.ip} on ${new Date().toISOString()}`);
    res
      .status(429)
      .json({ error: "Too many request, try again after 15 seconds" });
  },
});

const trackRequest = (req, res, next) => {
  const ip = req.ip;
  if (!req.app.locals[ip]) {
    req.app.locals[ip] = 0;
  }

  req.app.locals[ip]++;

  if (req.app.locals[ip] === 3) {
    warn(
      `Warning: User with IP ${ip} has made 3 requests on ${new Date().toISOString()}`
    );
  }

  next();
};

export { limiter, trackRequest };