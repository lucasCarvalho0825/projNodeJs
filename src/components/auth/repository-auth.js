import { MySQL } from "../../database/MySQL.js";
import { toEncode } from "../../util/securityCripto.js";

export async function findUnique( username ) {
    const data = await MySQL.user.findUnique({
        where : {
            username 
        }
    });

    await MySQL.$disconnect();
    return data;
}

MySQL.$use( async ( params, next) =>{
    if( params.model === "User" && params.action === "update" ){
        params.args.data.password = toEncode(params.args.data.password); 
    }
    return next(params);
});


export async function update( newdata ) {
    const data = await MySQL.user.update({
        where: { 
        id : newdata.id 
        },
        data : {
            ...newdata
        }
    })

    await MySQL.$disconnect();
    return data;
}

