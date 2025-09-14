const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI not found in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000, // 8s timeout
      retryWrites: true,
    });

    console.log("✅ MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
