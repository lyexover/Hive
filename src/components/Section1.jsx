import { FaAngleRight } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import styles from '@/css-modules/section1.module.css';
import Link from "next/link";


export default function Section1(){

    return (

        <section className={styles.section}>

            <div className={styles.banner}>
                <span>Pre-register now and get early access to our free beta version!</span>
                <FaAngleRight size={15} />
            </div>

            <div className={styles.text}>
                <h1>Collaborate in Real Time, Stay 
                  Organized. Get Things Done. 
                </h1>

                <p>Bring your team together in one interactive space — create rooms, assign tasks, and share ideas in real time. 
                    Stay organized, connected, and always up to date as work happens.
                </p>
            </div>

            <div className={styles.actions}>
                <Link href=''>Join Beta <FaAngleRight/> </Link>
                <Link href=''>Watch a demo <FaCirclePlay/> </Link>
            </div>
            
        </section>

    )
}