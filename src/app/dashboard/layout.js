import Navbar from "@/components/main/Navbar"
import styles from '@/css-modules/main/layout.module.css'


export default function MainLayout({ children }) {


    return (
          <div className={styles.mainLayout}>
            <Navbar className={styles.navbar}/>
            <main className={styles.mainContent}>
               {children}
            </main>
          </div>
    )
}