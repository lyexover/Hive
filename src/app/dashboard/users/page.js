
import AddUsers from "@/components/main/AddUsers";
import MyNetwork from "@/components/main/MyNetwork";
import { auth } from "../../../../auth";
import styles from '@/css-modules/main/users.module.css'
import Invites from "@/components/main/Invites";



export default async function UsersPage(props){

    const searchParams = await props.searchParams;
    const query = searchParams?.search || '';
    const {user} = await auth()


    return (
        <>
            <h2>Users</h2>
            
            <div  className={styles.usersContainer}>

                <AddUsers query={query}/>
                <div className={styles.Section2}>
                   <MyNetwork id={user.id}/>
                   <Invites id={user.id}/>
                </div>

            </div>
            
        </>
    )
}