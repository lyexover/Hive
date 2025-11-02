import { auth } from "../../../auth";
import Navbar from "@/components/main/Navbar";
import styles from '@/css-modules/main/layout.module.css'
import { ContextProvider } from "@/context/useSocket";



export default async function Layout({ children }) {
    const { user } = await auth();

    return (
        <div className={styles.mainLayout}>
            <Navbar user={user} />

            <ContextProvider userID={user.id}>

                 <main>{children}</main>

            </ContextProvider>
            
        </div>
    );
}