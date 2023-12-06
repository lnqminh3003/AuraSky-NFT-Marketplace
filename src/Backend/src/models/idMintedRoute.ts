import { Router } from "express";
import idMintedModel from "../models/idMintedModel";
import log from "../utils/log";

const idMintedRoute = Router();

idMintedRoute.get("/get", async (req, res) => {
    try {
        log("get all id minted");

        const ids = await idMintedModel.find({});
        res.json(ids);
    } catch (err) {
        res.status(500).json(err);
    }
});