import { stringToDataTime, dataTimeToString } from "../../util/formatDataTime.js";
import {MySQL} from "../../database/mysql.js"


MySQL.$use(async ( params, next) => {

    if( params.model === "Event" && params.action === "create" || params.action === "update" ){
        params.args.data.startDate = stringToDataTime(params.args.data.startDate);
        params.args.data.finalDate = stringToDataTime(params.args.data.finalDate);
    }

    return next(params);
});


export async function create (id, data) {

    const { title, startDate, finalDate, description, status, address } = data;

    const res =  await MySQL.event.create({
        data : {
            title, startDate, finalDate, description, status, idUser: id,
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



export async function deleteMe (id) {
    const data = await MySQL.event.delete({
        where: {
            id
        }
    })

    await MySQL.$disconnect();
    return res;
}


export async function findMany () {
    const res = await MySQL.event.findMany({include: {address:{}}});

    await MySQL.$disconnect();
    
    res.map(e => {
        e.startDate = dataTimeToString(e.startDate);
        e.finalDate = dataTimeToString(e.finalDate);
    })


    
    return res;
}


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


export async function findUnique (id) {
    const res = await MySQL.event.findUnique({where: { id }, include: { address:{} }});

    await MySQL.$disconnect();
    
    res.startDate = dataTimeToString(res.startDate);
    res.finalDate = dataTimeToString(res.finalDate);

    return res;
}

  /**
     * #################
     * ##   FILTROS   ##
     * #################
     */


export async function findName( title ) {

    const res = await MySQL.event.findMany({where: { title }, include: { address:{} }});

    await MySQL.$disconnect();
    
    res.map(e => {
        e.startDate = dataTimeToString(e.startDate);
        e.finalDate = dataTimeToString(e.finalDate);
       })

    return res;
}

