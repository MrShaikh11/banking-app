import db from "../db/db.js";

export const combineUserData = async (req, res, next) => {
  try {
    // Fetch users and transactions from the database
    const [users] = await db.query("SELECT * FROM users");
    const [transactions] = await db.query("SELECT * FROM transactions");

    console.log("Users:", users);
    console.log("Transactions:", transactions);

    // Combine users with their transactions
    const combinedData = users.map((user) => {
      const userTransactions = transactions
        .filter((tx) => tx.user_id === user.id) // Match transactions by user_id
        .map((tx) => ({
          type: tx.type,
          amt: parseFloat(tx.amount), // Convert amount to number
          balance: parseFloat(tx.balance), // Convert balance to number
          timestamp: tx.timestamp,
        }));

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        balance: parseFloat(user.balance), // Convert user balance to number
        role: user.role,
        transactions: userTransactions.length > 0 ? userTransactions : [],
      };
    });

    console.log("Combined Data:", combinedData);

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error combining user data:", error);
    res.status(500).json({ error: "Failed to combine user data" });
  }
};
