import { v4 as uuidv4 } from "uuid";
import express from "express";
import db from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());

// Simple GET request to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
});
app.get("/api/transactions", async (req, res) => {
  try {
    const [transactions] = await db.query("SELECT * FROM transactions");
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: error.message });
  }
});

app.use("/api", userRoutes);

app.post("/register", async (req, res) => {
  const { name, email, password, balance } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const userId = uuidv4(); // Generate unique ID

    const [result] = await db.query(
      "INSERT INTO users (id, name, email, password, balance) VALUES (?, ?, ?, ?, ?)",
      [userId, name, email, password, parseFloat(balance) || 0]
    );

    await db.query(
      "INSERT INTO transactions (user_id, type, amount, balance) VALUES (?, ?, ?, ?)",
      [userId, "deposit", balance || 0, balance || 0]
    );

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
