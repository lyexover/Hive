'use client'

import { IoPeople } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import styles from '@/css-modules/main/navbar.module.css'


export default function RoomsDropDown({rooms}) {

    const [isOpen, setIsOpen] = useState(false);


    return (

        <li>
            <button onClick={()=> setIsOpen(!isOpen)}>
                <span>
                    <IoPeople size={30} />
                    <span>Rooms</span>
                    {
                        isOpen ? <FaChevronUp size={12} className={styles.chevron} /> : <FaChevronDown className={styles.chevron} size={12} />
                    }
                </span>
            </button>

            <ul>
                {(isOpen && rooms.length>0) && rooms.map((room) => (
                    <li key={room.id}>
                        <Link href={`/rooms/${room.id}`}>
                            {room.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>

    )
}