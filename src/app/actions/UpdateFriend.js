'use server'

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export default async function updateFriend({requestID, senderID, receiverID, operation}){

    try {

        if (operation === 'reject') {
            const res = await sql`
                UPDATE friend_requests
                SET status = 'rejected'
                WHERE id = ${requestID}
            `;
            return {success: true};
        }

        // Si operation === 'accept'
        const res = await sql.begin(async sql => {

            await sql`
                UPDATE friend_requests
                SET status = 'accepted'
                WHERE id = ${requestID}
            `;

            await sql`
                INSERT INTO friends (friend1, friend2)
                VALUES (${senderID}, ${receiverID})
            `;

            return {success: true};

        });

        return res;

    }
    catch(err){
        console.error('transaction error', err);
        return {success: false, message: 'erreur serveur'};
    }

}