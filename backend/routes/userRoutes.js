import express from "express";
import { combineUserData } from "../middleware/combineData.js";

const router = express.Router();

// Route to get combined user data
router.get("/combined-users", combineUserData, (req, res) => {
  res.json(req.combinedData);
});

export default router;
