import {MySQL} from "../../database/MySQL.js";
import { toEncode } from "../../util/securityCripto.js";


export async function findMany() {
    const data = await MySQL.user.findMany({
        include: {
            profile : {
                include: {
                    address: {}
                }
            },
            events : {}
        }
    });

    await MySQL.$disconnect();
    return data;

}

export async function findUnique( id ) {
    const data = await MySQL.user.findUnique({
        where: {
            id
        }, 
        include: {
            profile : {
                include: { 
                    address: {}
                }
            }
        }
    });

    await MySQL.$disconnect();
    return data;

}

export async function findUsername( username ) {
    const data = await MySQL.user.findUnique({
        where: { 
            username 
        }
    });
    
    await MySQL.$disconnect();
    return data;

}

MySQL.$use( async ( params, next) =>{
    if( params.model === "User" && params.action === "create" ){
        params.args.data.password = toEncode(params.args.data.password); 
    }
    return next(params);
});


export async function create ( newdata ) {
    const data = await MySQL.user.create({
        data: {
            ...newdata,
            profile:{
                create:{
                }
            }
        }
    })
    await MySQL.$disconnect();
    return data;
}

export async function update( id, newdata) {
    const data = await MySQL.user.update({
        where : {
            id
        },
        data : {
            ...newdata
        }
    })
    await MySQL.$disconnect();
    return data;
}

export async function deletar(id) {
    const data = await MySQL.user.delete({
        where : {
            id
        }
    })
    await MySQL.$disconnect();
    return data;
}



