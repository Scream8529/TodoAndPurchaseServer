import express from "express";
import AuthRoute from "./auth.route";
import PurchaseRoute from "./purchase.route";
import GroupRoute from "./group.route";

const router = express.Router();

router.use("/auth", AuthRoute);
router.use("/purchases", PurchaseRoute);
router.use("/group", GroupRoute);

export default router;
