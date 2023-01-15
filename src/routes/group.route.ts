import { Request, Response } from "express";
import express from "express";
import { IRequestAfterMidlware } from "../models";
import groupController from "../controllers/group.controller";

const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/",
  authMiddleware,
  async (req: IRequestAfterMidlware<{ id: number }>, res: Response) => {
    try {
      const group = await groupController.add(req, { id: req.body.id });
      res.status(200).json(group);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);
router.delete("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = {};
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
router.post("/members", authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = {};
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;
