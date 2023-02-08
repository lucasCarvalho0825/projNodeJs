import { MySQL } from "../../database/MySQL.js";


/*
    CREATE perfil assim que criamos um novo usuário
    DELETE perfil assim que apagarmos o usuário

*/ 

export async function update( idUser, newdata) {
    const { name, bio, address } = newdata;
    const data = await MySQL.profile.update({
        where : {
            idUser
        },
        data : {
            name,
            bio,
            address: { 
                create: {
                    ...address
                }
            }
        },include:{
            address: {}
        }
    })

    await MySQL.$disconnect();
    return data;
}


export async function findUnique( idUser ) {
    const data = await MySQL.profile.findUnique({
        where: { 
            idUser
        }, 
        include:  {
            address: {}
        }
    });
    await MySQL.$disconnect();
    return data;

}