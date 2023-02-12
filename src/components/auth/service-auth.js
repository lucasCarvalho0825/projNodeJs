import { toDecode } from "../../util/securityCripto.js";
import { createToken } from "../../middlewares/securityToken.js"
import { findUnique, update} from "./repository-auth.js";


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
export async function signIn( req, res ) {
    const { username, password } = req.body;
    
    if(!username || !password) return res.status(400).send({message:"username ou password incorreto"});

    const data = await findUnique(username);

    if(!data) return res.status(404).send({message:"User não cadastrado"});

    if(!toDecode(password, data.password)) return res.status(400).send({message:"password incorreto"});

    const token = await createToken(data);

    return token ? res.status(200).send({token: token}) : res.status(401).send({message:"Erro no login"});
}


/**
 * @openapi
 * /auth:
 *   get:
 *     summary: LOGOUT DO USUÁRIO
 * 
 *     tags: 
 *       - "Auth"
 * 
 *     operationId: singOut
 *     x-eov-operation-handler: auth/routes
 *    

 *     responses:
 *        '200':
 *          description: SUCCESSIFUL
 *          content:
 *            application/json:
 *              schema:
 *                properties:
 *                  user:
 *                    type: string
 *                 
 * 
 *        '400':
 *          $ref: '#/components/responses/BadRequest'
 * 
 *     security:
 *       - JWT: []
 */
export async function signOut( req, res ) {
    if (req.headers.authorization ) {
        req.headers.authorization = ""

        return res.status(200).send({message: "user deslogado com sucesso, faça um novo login"})
    }
    return  res.status(400).send({code: 400, message: " nenhum usuário logado"})
}

/**
 * @openapi
 * /auth/reset:
 *   post:
 *     summary: RESETAR A SENHA DO USUÁRIO
 * 
 *     tags: 
 *       - "Auth"
 * 
 *     operationId: resetPass
 *     x-eov-operation-handler: auth/routes
 *     requestBody:
 *       description: Informações de cadastro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmacao:
 *                 type: string
 * 
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/Successful'
 *                 
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *        
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
export async function resetPass ( req, res ){

    const { username, password, confirmacao } = req.body;
    
    if(!username || !password) return res.status(400).send({message:"username ou password incorreto"});

    let data = await findUnique(username);

    if(!data) return res.status(404).send({code: 400, message: " nenhum usuário encontrado"})

    if( password !== confirmacao ) return res.status(400).send({code: 400, message: "as senhas não são iguais"});

    data.username = username;
    data.password = password
    

    data = await update(data);
    return data ?  res.status(200).send({code: 200, message: " Successful "}) : res.status(400).send({code: 400, message: " Bad Request"})

}