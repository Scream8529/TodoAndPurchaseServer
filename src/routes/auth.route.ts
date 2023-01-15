import { Request, Response } from "express";
import AuthController from "../controllers/auth.controller";
import express from "express";
import { wraperService } from "../services/wraper.service";
import { IRequestAfterMidlware } from "../models";

const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post("/registration", async (req: Request, res: Response) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    const response = await AuthController.registration({
      userName,
      password,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
router.post(
  "/login",
  async (
    req: Request<{ userName: string; password: string }>,
    res: Response
  ) => {
    try {
      const { userName, password } = req.body;
      const response = await AuthController.login({
        userName,
        password,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(wraperService.errorResponse([{ message: "Server error" }]));
    }
  }
);
router.get(
  "/auth",
  authMiddleware,
  async (req: IRequestAfterMidlware, res: Response) => {
    try {
      const response = await AuthController.auth(req);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(wraperService.errorResponse([{ message: "Server error" }]));
    }
  }
);

export default router;
