import { Request, Response } from "express";
import { ParcelService } from "./parcel.service";
import { parcelCreateSchema } from "./parcel.validation";
import { ParcelModel } from "./parcel.model";

export const createParcel = async (req: Request, res: Response) => {
  try {
    const data = parcelCreateSchema.parse(req.body);
    const userId = (req as any).user.id;
    const parcel = await ParcelService.createParcel(
      userId,
      data.receiverId,
      data.weight,
      data.address
    );
    res.status(201).json({ message: "Parcel created successfully", parcel });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelParcel = async (req: Request, res: Response) => {
  try {
    const parcelId = req.params.id;
    const userId = (req as any).user.id;
    const parcel = await ParcelService.cancelParcel(parcelId, userId);
    res.status(200).json({ message: "Parcel cancelled successfully", parcel });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateParcelStatus = async (req: Request, res: Response) => {
  try {
    const parcelId = req.params.id;
    const { status, note } = req.body;
    const userId = (req as any).user.id;
    const parcel = await ParcelService.updateStatus(
      parcelId,
      status,
      userId,
      note
    );
    res.status(200).json({ message: "Parcel status updated", parcel });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyParcels = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const parcels = await ParcelService.getUserParcels(userId);
    res.status(200).json(parcels);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getIncomingParcels = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const parcels = await ParcelService.getReceiverParcels(userId);
    res.status(200).json(parcels);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const trackParcel = async (req: Request, res: Response) => {
  try {
    const { trackingId } = req.params;
    // console.log("Tracking ID received:", trackingId);

    const parcel = await ParcelModel.findOne({ trackingId })
    // console.log("Parcel found:", parcel);

    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json(parcel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error tracking parcel" });
  }
};
