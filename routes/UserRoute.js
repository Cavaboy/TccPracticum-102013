import express from "express";
import {
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNoteById,
} from "../controllers/UserController.js";
import { authMiddleware } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/notes", authMiddleware, getNotes);
router.get("/notes/:id", authMiddleware, getNoteById);
router.post("/add-notes", authMiddleware, createNotes);
router.put("/edit-notes/:id", authMiddleware, updateNotes);
router.delete("/delete-notes/:id", authMiddleware, deleteNotes);

export default router;
