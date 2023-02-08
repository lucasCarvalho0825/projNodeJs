import swaggerUI from "swagger-ui-express";
import swaggerDOC from "swagger-jsdoc";
import openApiValidator from "express-openapi-validator";
import { decodedToken } from "../middlewares/securityToken.js";

// porque disso ? 
// são realmente necessários ???
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_PATH = `${__dirname}/`

const swaggerOptions = {
    swaggerDefinition:{    
        openapi: "3.0.1",
        info: {
            title: "API PROJETO NODE JS",
            version: "1.0.0",
            description: " Essa API foi desenvolvida durante a disciplina de node js, com intuito de ensinar aos alunos técnicas e fundamentos do Node e seus freameworks"
        },
        servers: [{
            url: `http://localhost:${process.env.PORT}`,
            description:" SERVIDOR OUVINDO NESSA URL "
        }]
    },
    apis: [
        `${BASE_PATH}../**/*.yaml`,
        `${BASE_PATH}../**/*.js`
    ]
};


const swagger = (app) => {
    const swaggerDocs = swaggerDOC(swaggerOptions);
    delete swaggerDocs.channels;

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    
    app.use(openApiValidator.middleware({
        apiSpec: swaggerDocs,
        
        validateRequests: true,
        validateResponses: true,
        
        validateSecurity: {
            handlers: {
                JWT: decodedToken
            }
        },
        operationHandlers: {
            basePath: BASE_PATH,
        }
    }));

}

export default swagger;