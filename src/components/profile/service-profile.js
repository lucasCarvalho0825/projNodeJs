import { update, findUnique } from "./repository-profile.js";


/**
 * @openapi
 * /profile/me:
 *   put:
 *     summary: ATUALIZAR AS INFORMAÇÕES DE PERFIL DO USUÁRIO
 *     description: método PUT que responde na url http://localhost:3000/profile/me  recebe no corpo da requisição as informações do perfil de usuário e as atualiza no banco de dados se e somente se o id do usuário seja igual ao do usuário que realizou a requisição 
 * 
 *     tags: 
 *       - "Profile"
 * 
 *     operationId: updateMe
 *     x-eov-operation-handler: profile/me/routes
 * 
 *     requestBody:
 *       description: atualizar os dados do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Profile" 
 * 
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Profile"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest' 
 * 
 *     security:
 *       - JWT: []
 */
export async function updateMe ( req, res ) {

    const id = req.user.id; 
    const data = await update(id, req.body);

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}


/**
 * @openapi
 * /profile/me:
 *   get:
 *     summary: BUSCAR UM PERFIL DE USUÁRIO
 *     description: método GET que responde na url http://localhost:3000/user/me  restaura todos os dados doe perfil do usuário logado.
 * 
 *     tags: 
 *       - "Profile"
 * 
 *     operationId: findMe
 *     x-eov-operation-handler: profile/me/routes
 * 
 *     responses:
 *        '200':
 *          description: SUCCESSIFUL
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Profile"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest'
 * 
 *     security:
 *        - JWT: []
 */
export async function findMe( req, res ){

    const id = req.user.id;
    const data = await findUnique(id);

    console.log(data)
    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}