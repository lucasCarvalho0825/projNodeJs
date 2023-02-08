import { create, deletar, findMany, findUnique, findUsername, update } from "./repository-user.js";


/**
 * @openapi
 * /user:
 *   get:
 *     summary: BUSCAR TODOS OS USUÁRIOS
 *     description: método GET que responde na url http://localhost:3000/user  restaura todos os dados de usuário no banco de dados, acesso a esse méto está restrito, permitido apenas para ADMINISTRADORES 
 * 
 *     tags: 
 *       - "User"
 * 
 *     operationId: findAll
 *     x-eov-operation-handler: user/routes
 * 
 *     responses:
 *        '200':
 *          description: SUCCESSIFUL
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest'
 * 
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 * 
 *     security:
 *        - JWT: ["ADMIN"]
 */
export async function findAll( req, res ){

    if( req.user.role !== "ADMIN") res.status(401).send({code: 401, message: "Unauthorized"});

    const data = await findMany();

    data.map( d => {
        d.password = undefined;
    })

    return data ? res.status(200).send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}

/**
 * @openapi
 * /user/me:
 *   get:
 *     summary: BUSCAR UM USUÁRIO
 *     description: método GET que responde na url http://localhost:3000/user/me  restaura todos os dados do usuário logado.
 * 
 *     tags: 
 *       - "User"
 * 
 *     operationId: findMe
 *     x-eov-operation-handler: user/me/routes
 * 
 *     responses:
 *        '200':
 *          description: SUCCESSIFUL
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest'
 * 
 *     security:
 *        - JWT: []
 */
export async function findMe( req, res ) {
    const id = req.user.id;

    const data = await findUnique(id);

    data.password = undefined;

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}

export async function findMeUser( req, res ) {
    const { username } = req.params.username;
    
    const data = await findUsername(username);
    data.password = undefined;

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}

/**
 * @openapi
 * /user:
 *   post:
 *     summary: CRIAR UM NOVO USUÁRIO
 *     description: método POST que responde na url http://localhost:3000/user  recebe no corpo da requisição as informações do usuário e adiciona uma novo registro de usuário no banco de dados com os dados informados
 * 
 *     tags: 
 *       - "User"
 * 
 *     operationId: newUser
 *     x-eov-operation-handler: user/routes
 * 
 *     requestBody:
 *       description: Informações de cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 * 
 *     responses:
 *        '201':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest' 
 */
export async function newUser ( req, res ) {

    const exist = await findUsername( req.body.username );
    if(exist) return res.status(400).send({code: 400, message: "username já existe no banco de dados"});

    const data = await create( req.body );

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});

}

/**
 * @openapi
 * /user/me:
 *   put:
 *     summary: ATUALIZAR AS INFORMAÇÕES DO USUÁRIO
 *     description: método PUT que responde na url http://localhost:3000/user/me  recebe no corpo da requisição as informações do usuário e as atualiza no banco de dados se e somente se o id do usuário seja igual ao do usuário que realizou a requisição 
 * 
 *     tags: 
 *       - "User"
 * 
 *     operationId: updateMe
 *     x-eov-operation-handler: user/me/routes
 * 
 *     requestBody:
 *       description: atualizar os dados do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User" 
 * 
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest' 
 * 
 *     security:
 *       - JWT: []
 */
export async function updateMe ( req, res ) {
    const id  = req.user.id;

    const data = await update( id, req.body );

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}

/**
 * @openapi
 * /user/me:
 *   delete:
 *     summary: DELETAR AS INFORMAÇÕES DO USUÁRIO
 *     description: método DELETE que responde na url http://localhost:3000/user/me  deleta as informações do usuário no banco de dados se e somente se o id do usuário seja igual ao do usuário que realizou a requisição 
 * 
 *     tags: 
 *       - "User"
 * 
 *     operationId: deleteMe
 *     x-eov-operation-handler: user/me/routes
 
 *     responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest' 
 * 
 *     security:
 *       - JWT: []
 */
export async function deleteMe ( req, res ) {
    const id = req.user.id;

    const data = await deletar( id );

    return data ? res.send(data) : res.status(400).send({code: 400, message: "Bad Request"});
}