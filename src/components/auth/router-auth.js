import express from "express";
import { singIn } from "./service-auth.js";

const router = express.Router();

const auth = "/auth"

router
 .post(auth, singIn)

export default router;