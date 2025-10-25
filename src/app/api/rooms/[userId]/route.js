import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });



export async function GET(request, { params }) {

    const { id } = params;
    try {
        const rooms = await sql`
         SELECT * FROM 
         rooms JOIN room_members ON rooms.id = room_members.room_id 
         WHERE user_id = ${id} 
        `;

        return new Response(JSON.stringify(rooms), { status: 200 });
    }

    catch(err){
        return new Response(JSON.stringify({message:'Internal Server Error'}), { status: 500 });
    }


}