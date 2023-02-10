import express from "express";
import { decodedToken } from "../../middlewares/securityToken.js";
import { deleteEvent, findAllMe, newEvent, updateEvent } from "./event-Service.js";
import { findAll, findEvent, findByName} from "./event-filter.js";
const router = express.Router();

const event = "/event"
const eventMe = "/event/me"
const eventMeEvent = "/event/me/event"

router
    .get(event, decodedToken, findAll)
    .post(eventMe, decodedToken, newEvent)
    .get(eventMe, decodedToken, findAllMe)
    .put(eventMe, decodedToken, updateEvent)
    .delete(eventMe, decodedToken, deleteEvent)
    .get(eventMeEvent+"/:id", findEvent)
    .get(eventMeEvent+"/title",findByName)
    


export default router;