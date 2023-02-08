import { MySQL } from "../../database/MySQL.js";


export async function findUnique( username ) {
    const data = await MySQL.user.findUnique({
        where : {
            username 
        }
    });

    await MySQL.$disconnect();
    return data;
}