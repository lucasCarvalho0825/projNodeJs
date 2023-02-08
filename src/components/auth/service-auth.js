import { toDecode } from "../../util/securityCripto.js";
import { createToken } from "../../middlewares/securityToken.js"
import { findUnique } from "./repository-auth.js";



/**
 * @openapi
 * /auth:
 *   post:
 *     summary: AUTENTICAR UM USUÁRIO
 *     description: método POST que responde na url http://localhost:3000/auth  concede acesso a um usuário aos métodos do sistema
 * 
 *     tags: 
 *       - "Auth"
 * 
 *     operationId: singIn
 *     x-eov-operation-handler: auth/routes
 *    
 *     requestBody:
 *       description: Informações de cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Credentials"
 *     responses:
 *        '200':
 *          description: SUCCESSIFUL
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  token:
 *                    type: string
 *                 
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest'
 *        '404':
 *          $ref: '#/components/responses/NotFound'
 */
export async function singIn( req, res ) {
    const { username, password } = req.body;
    
    const data = await findUnique(username);

    if(!data) return res.sendStatus(404);
    if(!toDecode(password, data.password)) return res.sendStatus(404);

    const token = await createToken(data);

    return token ? res.send({token: token}) : res.sendStatus(400);
}