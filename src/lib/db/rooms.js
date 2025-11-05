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
        
    }
}


export async function fetchNotes(roomID){

    try {
        const notes = await sql `
           SELECT u.first_name, u.last_name, u.id as author_id, n.* FROM
           notes n JOIN users u on n.user_id = u.id
           WHERE n.room_id = ${roomID}
        `


        return Array.from(notes)
    }

    catch(err){
        console.error('error fetching notes', err)
        return []
    }

}