import { Router } from "express";
import { sampleEmails } from "../data/sampleEmails.js";
import { analyzeEmail } from "../services/detector.js";

const router = Router();

router.get("/samples", (_req, res) => res.json({ samples: sampleEmails }));

router.post("/scan/random", (_req, res, next) => {
  try {
    const email = sampleEmails[Math.floor(Math.random() * sampleEmails.length)];
    res.json({ email: analyzeEmail(email) });
  } catch (error) {
    next(error);
  }
});

router.post("/scan", (req, res, next) => {
  try {
    res.json({ email: analyzeEmail(req.body) });
  } catch (error) {
    next(error);
  }
});

export default router;