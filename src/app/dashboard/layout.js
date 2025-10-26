import { auth } from "../../../auth";
import Navbar from "@/components/main/Navbar";
import styles from '@/css-modules/main/layout.module.css'



export default async function Layout({ children }) {
    const { user } = await auth();

    return (
        <div className={styles.mainLayout}>
            <Navbar user={user} />
            <main>{children}</main>
        </div>
    );
}