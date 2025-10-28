'use server'

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });


export async function SendRequest(receiverId, sender) {
    try {
        await sql`
            INSERT INTO friend_requests (sender_id, receiver_id, status)
            VALUES (${sender}, ${receiverId}, 'pending')
        `;
        console.log('Friend request sent successfully');

        return { success: true, message: 'Friend request sent successfully' };
    }
    catch(error) {
        console.error('Error sending friend request:', error);
        return { success: false, message: 'Error sending friend request' };
    }
}