import express from "express";
import {
  trackVisit,
  getWeeklyVisits,
  getMonthlyVisits,
  getYearlyVisits
} from "../controllers/visitor.controllers.js";

const router = express.Router();

router.post("/track", trackVisit); // called from frontend
router.get("/weekly", getWeeklyVisits);
router.get("/monthly", getMonthlyVisits);
router.get("/yearly", getYearlyVisits);

export default router;
