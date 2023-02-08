import express from "express";
import { decodedToken } from "../../middlewares/securityToken.js";
import { resetPass, signIn, signOut } from "./service-auth.js";

const router = express.Router();

const auth = "/auth"
const authReset = "/auth/reset"

router
 .post(auth, signIn)
 .get(auth, decodedToken, signOut)
 .post( authReset, resetPass)
export default router;