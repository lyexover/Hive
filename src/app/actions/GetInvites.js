'use server'

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });


export default async function GetInvites(id){

   try {
       const res= await sql`
          SELECT fr.id, fr.sender_id, fr.receiver_id, fr.status, u.first_name, u.last_name
          FROM 
          friend_requests fr JOIN users u on fr.sender_id = u.id
          WHERE fr.receiver_id = ${id} AND fr.status = 'pending';
       `

       return ({success: true, data: res})
   }
   catch(err){
    console.log(err)
    return ({sucess : false})
   }


}