import { create, findMany, findManyMe, findUnique, update} from "./event-Repository.js";


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
 * /event:
 *   post:
 *     summary: PERMITE AO MODERADOR ATUAL A CRIAR UM NOVO EVENTO 
 *     description: método post que responde na url http://localhost:3000/event  recebe no corpo da requisição as informações do evento e adiciona uma nova estância de evento no banco de dados se a apermissão do usuário for de moderaor
 * 
 *     tags: 
 *       - "Event"
 * 
 *     operationId: newEvent
 *     x-eov-operation-handler: event/routes
 * 
 *     requestBody:
 *       description: Informações de cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 * 
 *     responses:
 *        '201':
 *          description: Successful operation
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
 *        - JWT: ["MODERATOR"]
 */
export async function newEvent( req, res ) {

    if( req.user.role !== "MODERATOR") return res.status(401).send({code: 401, message: "Unauthorized"});
    const id = req.user.id;

    const data = await create( id, req.body );
    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}


/**
 * @openapi
 * /event/me:
 *   get:
 *     summary: "PERMITE AO MODERADOR ATUAL RESTAURAR OS DADOS DE TODOS OS EVENTOS"
 *     description: O método GET que responde na url http://localhost:3000/event/me retornar todos os registros de eventos salvos no banco de dados de um usuário.
 *     tags: 
 *       - "Event"
 * 
 *     operationId: findAllMe
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
 *     security:
 *        - JWT: []
 * 
 */
export async function findAllMe( req, res ) {

    //PRECISA MELHORAR
    if( req.user.role !== "MODERATOR") return res.status(401).send({code: 401, message: "Unauthorized"});

   const data  = await findManyMe();
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
 * /event/me:
 *   put:
 *     summary: PERMITE AO MODERADOR ATUAL ATUALIZAR UM EVENTO
 *     description: método PUT que responde na url http://localhost:3000/event/me  recebe no corpo da requisição as informações do evento e atualiza suas informações no banco de dados 
 * 
 *     tags: 
 *       - "Event"
 * 
 *     operationId: updateEvent
 *     x-eov-operation-handler: event/me/routes
 * 
 *     requestBody:
 *       description: Atualizar Informações
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 * 
 *     responses:
 *        '200':
 *          description: Successful operation
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
 *        - JWT: ["MODERATOR"]
 */
export async function updateEvent( req, res ){
    
    if( req.user.role !== "MODERATOR") return res.status(401).send({code: 401, message: "Unauthorized"});
    const id = req.user.id;

    const data = await update( id, req.body );
    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}


/**
 * @openapi
 * /event/me:
 *   delete:
 *     summary: PERMITE AO MODERADOR ATUAL DELETA UM EVENTO
 *     description: método DELETE que responde na url http://localhost:3000/event/me recebe no corpo da requisição O ID do evento e deleta suas informações no banco de dados 
 * 
 *     tags: 
 *       - "Event"
 * 
 *     operationId: deleteEvent
 *     x-eov-operation-handler: event/me/routes
 * 
 *     requestBody:
 *       description: Deleta as Informações de um evento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Event"
 * 
 *     responses:
 *        '200':
 *          description: Successful operation
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
 *        - JWT: ["MODERATOR"]
 */
export async function deleteEvent( req, res ){
    
    if( req.user.role !== "MODERATOR") return res.status(401).send({code: 401, message: "Unauthorized"});
    const id = req.user.id;

    const data = await update( id, req.body );
    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}
