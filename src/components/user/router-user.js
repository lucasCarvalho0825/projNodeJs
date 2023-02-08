import express from "express";
import { decodedToken } from "../../middlewares/securityToken.js"
import { deleteMe, findAll, findMe, newUser, updateMe } from "./service-user.js";

const router = express.Router();

const user = "/user"
const userMe = "/user/me"

router
 .get(user, decodedToken, findAll)
 .get(userMe, decodedToken,  findMe)
 .post(user, newUser)
 .put(userMe, decodedToken, updateMe )
 .delete(userMe, decodedToken, deleteMe)

export default router;