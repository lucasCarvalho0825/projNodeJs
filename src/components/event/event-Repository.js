import { stringToDataTime, dataTimeToString } from "../../util/formatDataTime.js";
import {MySQL} from "../../database/mysql.js"


MySQL.$use(async ( params, next) => {

    if( params.model === "Event" && params.action === "create" || params.action === "update" ){
        params.args.data.startDate = stringToDataTime(params.args.data.startDate);
        params.args.data.finalDate = stringToDataTime(params.args.data.finalDate);
    }

    return next(params);
});


/**
 * método create, adiciona um novo registro de evento ao banco de dados.
 */
export async function create (id, data) {

    const { title, startDate, finalDate, description, address } = data;

    const res =  await MySQL.event.create({
        data : {
            title, startDate, finalDate, description, idUser: id,
            address : {
                create : {
                    ...address
                }
            }
        },
        include:{
            address: {}
        }
    })

    await MySQL.$disconnect();
    return res;
    
}


/**
 * método update, atualiza as informações de um evento no banco de dados
 */
export async function update (id, data) {
    const { title, startDate, finalDate, description, address } = data;

    const res =  await MySQL.event.update({
        where : {
            id
        },
        data : {
            title, startDate, finalDate, description,
            address : {
                create : {
                    ...address
                }
            }
        },
        include:{
            address: {}
        }
    })

    await MySQL.$disconnect();
    return res;
}


/**
 * método delete, deleta as informações de um evento no banco de dados e por cascata o endereço associado a ele.
 */
export async function deleteMe (id) {
    const data = await MySQL.event.delete({
        where: {
            id
        }
    })

    await MySQL.$disconnect();
    return res;
}



/**
 * método findMany, restaura todas os eventos do banco de dados
 */
export async function findMany () {
    const res = await MySQL.event.findMany({include: {address:{}}});

    await MySQL.$disconnect();
    
    res.map(e => {
        e.startDate = dataTimeToString(e.startDate);
        e.finalDate = dataTimeToString(e.finalDate);
    })


    
    return res;
}

/**
 * método findMany, restaura todas os eventos do banco de dados de um usuário
 */
export async function findManyMe ( idUser ) {
    const res = await MySQL.event.findMany({
        where: { 
            idUser 
        },
        include: { 
            address:{} 
        }
    });

    await MySQL.$disconnect();
    
    res.map(e => {
        e.startDate = dataTimeToString(e.startDate);
        e.finalDate = dataTimeToString(e.finalDate);
       })

    return res;
}

/**
 * método findUnique, restaura um evento do banco de dados
 */
export async function findUnique (id) {
    const res = await MySQL.event.findUnique({where: { id }, include: { address:{} }});

    await MySQL.$disconnect();
    
    res.startDate = dataTimeToString(res.startDate);
    res.finalDate = dataTimeToString(res.finalDate);

    return res;
}


