import { MySQL } from "../../database/MySQL.js";


/*
    CREATE perfil  -> Create USER  (o perfil é gerado automaticamente assim que criamos um novo usuário)
    DELETE perfil ->  Delete USER ( o perfil é apagado automaticamente assim que deletamos o usuário

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

