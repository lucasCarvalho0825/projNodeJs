import { PrismaClient } from "@prisma/client";
import { toEncode } from "../util/securityCripto.js";


export const MySQL = new PrismaClient();

