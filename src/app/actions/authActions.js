'use server'
import { signIn } from '../../../auth'
import postgres from 'postgres';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs'

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });


export async function login(prevState, formData){

    try {
         const email = formData.get('email');
         const password = formData.get('password');

         const result = await signIn('credentials', {
            redirectTo: '/dashboard',
            email,
            password,
         });

    }

    catch(err){
        if(err instanceof AuthError){
            switch(err.type){
                case 'CredentialsSignin':
                    return {...prevState, errorMessage: 'Email ou mot de passe incorrect.'};
                default:
                    return {...prevState, errorMessage: 'Une erreur est survenue. Veuillez réessayer.'};
            }
        }

        //Next auth automatically throws an error when 'redirectTo' is used with signIn, so
        // when the catch bloc catches it, we rethrow it again to avoid blocking the redirect.
    
        throw err;
    }


}



export async function signUp(prevState, formData){

    try {
        const email = formData.get('email')
        const password = formData.get('password')
        const first_name = formData.get('prenom')
        const last_name = formData.get('nom')

        

        const existing = await sql`SELECT * FROM users WHERE email=${email}`

        if(existing.length > 0) return {...prevState, errorMessage: 'email already used'}

        const hashedPassword = await bcrypt.hash(password, 10)

        

        await sql`INSERT INTO users(email, password, first_name, last_name) VALUES
             (${email}, ${hashedPassword}, ${first_name}, ${last_name})`

           

        await signIn('credentials', {
            redirectTo: '/dashboard',
            email,
            password,
        });

    }
    catch(err){

         if(err instanceof AuthError){
            return {...prevState, errorMessage: 'Erreur lors de la connexion automatique'}
        }

        throw err;
    }


}