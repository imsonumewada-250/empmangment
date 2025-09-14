require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

const app = express();

/* Connect to MongoDB */
connectDB();

/* CORS Setup */
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://employee-management-rho-three.vercel.app", // Vercel frontend
  "https://employee-management-hm9g2mmh3-aditya-singhs-projects-f73ca3a0.vercel.app" // optional extra domain
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // for curl/postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

/* Routes */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employee", require("./routes/empRoutes"));

/* Test route */
app.post("/test", (req, res) => {
  console.log("📩 Received body:", req.body);
  res.json({ receivedBody: req.body });
});

/* Health check */
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
});

module.exports = app;
