'use server'

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function getRoomsByUserId(userId) {
    try {
        const rooms = await sql`
            SELECT * 
            FROM rooms 
            JOIN room_members ON rooms.id = room_members.room_id 
            WHERE room_members.user_id = ${userId}
        `;
        
        return { success: true, data: rooms };
    } catch (err) {
        console.error('Error fetching rooms:', err);
        return { success: false, data: [], error: err.message };
    }
}