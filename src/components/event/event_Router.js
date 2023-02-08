import express from "express";
import { findAll, newEvent } from "./event_Service.js";

const router = express.Router();

const event = "/event"

router
    .post(event, newEvent)
    .get(event, findAll);

export default router;