import JWT from "jsonwebtoken";

    /**
     * ###################
     * ####    JWT    ####
     * ####   TOKEN   ####
     * ###################
     */

const wordSecret = process.env.WORD_SECRET;

export async function createToken(params) {
    return JWT.sign(params, wordSecret, {expiresIn: "24h"} );
}

export async function decodedToken(req, res, next) {
    
    //se o campo autorização do cabeçalhor estiver vazio
    if (!req.headers.authorization) {
        return res.status(403).send({code: 403, message: "Token não informado"});
      }
    
    // format token for diferente de Bearer sjknkdndnvndskvnskdnnv...
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).send({code: 403, message: "Formato do token inválido."});
    }

    try {
        const decoded = JWT.verify(token, wordSecret);
        req.user = decoded;
        
        return next();
      
    } catch (err) {
        return res.status(401).send({code: 401, message: "Acesso negado."});
    }
    
}