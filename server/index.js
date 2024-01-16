const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); // Assuming your db.js contains the PostgreSQL connection logic

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.json("heloo");
})

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Create tables if they do not exist
  try {
    await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_password VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS centers (
        center_id SERIAL PRIMARY KEY,
        location VARCHAR(255) UNIQUE NOT NULL,
        street VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        postal_code INT NOT NULL,
        available_slots INT NOT NULL
    );
    
      `);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
});
