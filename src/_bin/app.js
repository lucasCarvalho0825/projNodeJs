

/**     INFORMAÇÕES 
 * 
 * arquivo APP é responsável por gerenciar todas as configurações do projeto
 * 
 * body-parser - middlewarer que permite ao app interpretar arquivos do tipo JSON
 * 
 * cors - middlewarer que permite ao app receber requisições de qualquer tipo de front-end(client)
 * 
 * router.js - Nesse arquivo estão todas as configurações para gerenciamento das rotas da API
 * 
 * swagger.js - Nesse arquivo estão todas as configurações para startar a documentação da API
 */


import express from "express"
import bodyParser from "body-parser";
import routes from "./router.js"
import swagger from "../docs/swagger-docs.js"


const APP = express();

APP.use(bodyParser.json())
APP.use(bodyParser.urlencoded({extended: false}))

routes(APP)
swagger(APP)


export default APP;

