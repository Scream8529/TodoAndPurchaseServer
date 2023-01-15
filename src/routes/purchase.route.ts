import { Response } from "express";
import { IRequestAfterMidlware } from "models";
import { PurchaseState } from "models/purchase";
import PurchaseController from "./../controllers/purchase.controller";

const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/",
  authMiddleware,
  async (req: IRequestAfterMidlware, res: Response) => {
    try {
      const response = await PurchaseController.getAll(
        req,
        Number(req.query.page ?? 1),
        Number(req.query.page_size ?? 50)
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);
router.post(
  "/",
  authMiddleware,
  async (req: IRequestAfterMidlware<{ title: string }>, res: Response) => {
    try {
      const response = await PurchaseController.addPerchase(req, {
        title: req.body.title,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);

router.delete(
  "/",
  authMiddleware,
  async (req: IRequestAfterMidlware, res: Response) => {
    try {
      const response = await PurchaseController.removePerchase(
        Number(req.query.id)
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);
router.put(
  "/",
  authMiddleware,
  async (
    req: IRequestAfterMidlware<{ purchaseId: number; state: PurchaseState }>,
    res: Response
  ) => {
    try {
      const response = await PurchaseController.changePurchaseStatus({
        purchaseId: req.body.purchaseId,
        state: req.body.state,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
);

export default router;
