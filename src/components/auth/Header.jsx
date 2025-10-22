import { MdHive } from "react-icons/md";
import styles from '@/css-modules/auth.module.css';


export default function AuthHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
               <MdHive size={35} />
               <span>Hive</span>
             </div>

             <span>Create Together</span>

      </header>
    )
}