
/**     INFORMAÇÕES 
 * 
 * arquivo server é responsável por ouvir todas as requisições da API
 * 
 * dotenv - middlewarer que permite a API ter acesso a váriáveis globais 
 * en geral são váriaveres de configurações com dados sensíveis que não podem 
 * ser compartilhadas 
 * 
 * import mongodb from "../database/mongodb.js";
 * mongobd - arquivo que instância o objeto do banco de dados Mongo DB.
 * 
 */

import dotenv from "dotenv/config"
import { MySQL } from "../database/MySQL.js";
import APP from "./app.js"

const PORT = process.env.PORT || 8080;

if( !MySQL ){
    console.log(`banco de dados não conectado !`)
}else{
    APP.listen(PORT, () => {
        console.log(`servidor ouvindo em: http://localhost:${PORT}`);
        console.log(`Documentação url: http://localhost:${PORT}`+"/api-docs");
    }) 
}
