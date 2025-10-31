'use client'
import { useState } from "react"
import { MdGroupAdd } from "react-icons/md";
import styles from '@/css-modules/main/rooms.module.css'
import AddUserModal from "./AddUserModal";



export default function Header({roomID, userID}){

     const [isOpen, setIsOpen]= useState(false)

    return (
        <>
           <div className={styles.header}>
               <h2>Rooms</h2>
               <button onClick={()=>setIsOpen(true)}><MdGroupAdd size={20} /> Add user</button>
           </div>

            {isOpen &&
            <AddUserModal roomID={roomID} userID={userID} onClose={()=>setIsOpen(false)} />
           }
      </>

    )
}