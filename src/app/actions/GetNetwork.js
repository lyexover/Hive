'use server'

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });


export async function GetNetwork(id){

 try {
    const network = await sql`
    SELECT u.id, u.email, u.first_name, u.last_name
    FROM users u
    JOIN friends f
      ON u.id = CASE 
       WHEN f.friend1 = ${id} THEN f.friend2
       ELSE f.friend1
    END
    WHERE ${id} IN (f.friend1, f.friend2)
    `

    return ({success:true, data: network})
 }
 catch(err){
    return ({success : false})
 }

}