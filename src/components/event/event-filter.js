import { findMany, findUnique, findName } from "./event-Repository.js";


/**
 * @openapi
 * /event:
 *   get:
 *     summary: "RESTAURA OS DADOS DE TODOS OS EVENTOS"
 *     description: O método GET que responde na url http://localhost:3000/event retornar todos os registros de eventos salvos no banco de dados.
 *     tags: 
 *       - "Event"
 * 
 *     operationId: findAll
 *     x-eov-operation-handler: event/me/routes 
 * 
 *     responses:
 *        '200':
 *          description: "Successful"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Event"
 *              
 *        '400':
 *          $ref: '#/components/responses/BadRequest'
 * 
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 * 
 *     security:
 *        - JWT: ["ADMIN", "USER"]
 * 
 */
export async function findAll( req, res ) {

    //PRECISA MELHORAR
    if( req.user.role === "MODERATOR") return res.status(401).send({code: 401, message: "Unauthorized"});

    const data = await findMany();

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}


/**
 * @openapi
 * /event/me/event/{id}:
 *   get:
 *     summary: "RESTAURA OS DADOS DE UM EVENTO"
 *     description: O método GET que responde na url http://localhost:3000/event/me/event retornar os registros de um evento salvo no banco de dados.
 *     
 *     tags: 
 *       - "Event"
 * 
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *
 *
 *     operationId: findEvent
 *     x-eov-operation-handler: /event/me/event/{id}/routes 
 * 
 *     responses:
 *        '200':
 *          description: "Successful"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Event"
 *              
 *        '404':
 *          $ref: '#/components/responses/NotFound'        
 * 
 */
export async function findEvent( req, res ) {

    const id = parseInt(req.params.id);
    const data = await findUnique(id);
    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});

}


/**
 * @openapi
 * /event/me/event/title:
 *   get:
 *     summary: "RESTAURA OS DADOS DE UM EVENTO"
 *     description: O método GET que responde na url http://localhost:3000/event/me/event/title retornar os registros de um evento salvo no banco de dados.
 *     
 *     tags: 
 *       - "Event"
 * 
 * 
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *
 *
 *     operationId: findByName
 *     x-eov-operation-handler: /event/me/event/title/routes 
 * 
 *     responses:
 *        '200':
 *          description: "Successful"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Event"
 *              
 *        '404':
 *          $ref: '#/components/responses/NotFound'        
 * 
 */
export async function findByName( req, res ) {
    const data = await findName(req.query.title);
    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});

}
