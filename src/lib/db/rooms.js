import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function fetchUserRooms(userId) {
    try {
        const rooms = await sql`
            SELECT rooms.id 
            FROM rooms 
            JOIN room_members ON rooms.id = room_members.room_id 
            WHERE room_members.user_id = ${userId}
        `;

        console.log(rooms)
        
        return rooms;
    } catch (err) {
        console.error('Error fetching rooms:', err);
        throw err;
    }
}