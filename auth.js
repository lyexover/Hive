import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });


async function getUser(email){

    try {

        const user = await sql`
        SELECT * FROM users WHERE email = ${email} `;

        return user[0];

    }
    catch (error) {
        console.error('Database query error:', error);
        throw new Error('Database query failed');
    }

}


export const {auth, signIn, signOut} = NextAuth({

        ...authConfig,
        
        providers: [
            Credentials({

                async authorize(credentials) {
                    
                   const {email, password} = credentials;

                   if(!email || !password){
                    return null; 
                   }

                   const user = await getUser(email);

                   if(!user){
                    return null; 
                   }

                   const isPasswordValid = await bcrypt.compare(password, user.password);

                   if(!isPasswordValid){
                    return null; 
                   }

                   return user

                    }
              })
        
        ], 

        callbacks : {

            async jwt({token, user}){
                if(user){
                    token.id = user.id;
                    token.email = user.email;
                    token.first_name = user.first_name;
                    token.last_name = user.last_name;
                }
                return token
            }, 

            async session({session, token}){
                if(token){
                    session.user.id = token.id;
                    session.user.email = token.email;
                    session.user.first_name = token.first_name;
                    session.user.last_name = token.last_name;
                }
                return session
            }

        }


    
    
});
