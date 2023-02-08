import express from "express";
import { decodedToken } from "../../middlewares/securityToken.js";
import { deleteEvent, findAll, findAllMe, findEvent, newEvent, updateEvent } from "./event-Service.js";

const router = express.Router();

const event = "/event"
const eventMe = "/event/me"
const eventMeEvent = "/event/me/event"

router
    .get(event, findAll)
    .post(event, decodedToken, newEvent)
    .get(eventMe, decodedToken, findAllMe)
    .put(eventMe, decodedToken, updateEvent)
    .delete(eventMe, deleteEvent)
    .get(eventMeEvent, findEvent)
    


export default router;