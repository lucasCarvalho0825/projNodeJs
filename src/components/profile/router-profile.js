import express from "express";
import { updateMe, findMe} from "./service-profile.js";
import { decodedToken } from "../../middlewares/securityToken.js"


const router = express.Router();

const profile = "/profile/me";


router
  .put(profile, decodedToken, updateMe )
  .get(profile, decodedToken, findMe );

export default router;