import bcrypt from "bcryptjs";

    /**
     * ##################
     * ##   BCRYPT     ##
     * ## CRIPTOGRAFIA ##
     * ##################
     */

const salt = process.env.SALT;


export function toEncode ( password ){
    return bcrypt.hashSync( password, 10 )
}

export function toDecode ( password, hashPassword ){
    return bcrypt.compareSync(password, hashPassword );
}
