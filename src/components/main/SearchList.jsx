import postgres from 'postgres';
import { auth } from '../../../auth';
import UserItem from './UserItem';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });




async function handleSearch({query, user}){
   
 try {
     const searchPattern = `%${query}%`; // Create the pattern outside the query
     
     const users = await sql`                                   
               SELECT *
         FROM users
         WHERE id <> ${user.id}
         AND id NOT IN (
           SELECT 
             CASE 
               WHEN friend1 = ${user.id} THEN friend2
               ELSE friend1
             END
           FROM friends
           WHERE friend1 = ${user.id} OR friend2 = ${user.id}
         )
         AND id NOT IN (
           SELECT 
             CASE 
               WHEN sender_id = ${user.id} THEN receiver_id
               ELSE sender_id
             END
           FROM friend_requests
           WHERE (sender_id = ${user.id} OR receiver_id = ${user.id})
             AND status = 'pending'
         )
         AND (
           first_name ILIKE ${searchPattern}
           OR last_name ILIKE ${searchPattern}
           OR email ILIKE ${searchPattern}
         )
         ORDER BY first_name ASC;
     `;

        return users;
}
     catch(error){
       console.error('Error fetching users:', error);
       return [];
      }
}



export default async function SearchList({query}){

     const {user} = await auth()
     const users = await handleSearch({query, user});

     console.log('query:', query);

     


    return (
      <div>

        {users.length === 0 ? (
            <p>No users found.</p>
        ) : (
            <ul>
                {users.map((u) => (
                   <UserItem key={u.id} user={u} sender={user.id} />
                ))}
            </ul>
        )}
      </div>
    )

}


    
