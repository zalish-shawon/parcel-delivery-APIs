import express from "express";
import {
  createParcel,
  cancelParcel,
  updateParcelStatus,
  getMyParcels,
  getIncomingParcels,
  trackParcel,
} from "./parcel.controller";
import { authMiddleware } from "../common/middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware(["sender", "admin"]), createParcel);
router.get("/me", authMiddleware(["sender"]), getMyParcels);
router.get("/incoming", authMiddleware(["receiver"]), getIncomingParcels);
router.patch("/cancel/:id", authMiddleware(["sender"]), cancelParcel);
router.patch("/status/:id", authMiddleware(["admin"]), updateParcelStatus);
router.get("/track/:trackingId", trackParcel);

export default router;
