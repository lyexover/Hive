'use client'

import styles from '@/css-modules/main/rooms.module.css'
import { GiPapers } from "react-icons/gi";
import { FcParallelTasks } from "react-icons/fc";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddNote from './AddNote';


export default function Notes({initialNotes, roomID, userID}){


    const [isOpen, setIsOpen] = useState(false)
    const [notes, setNotes]= useState(initialNotes)



    return (


        <>
        
        <div className={styles.notesContainer}>
            <div className={styles.head}>
               <h4><GiPapers size={21}/> Sticky Notes</h4>
               <button onClick={()=> setIsOpen(true)}><RiStickyNoteAddLine size={21}/></button>
            </div>

            <div className={styles.notesList}>
              {
                notes.length == 0 ? <span>No notes to display..</span>: 
                <ul>
                    {
                        notes.map(note=> (
                            <li key={note.id}>
                                 <HiOutlineDotsVertical size={18}/>
                                 <p>"{note.content}"</p>
                                 <span>Created by: {note.first_name} {note.last_name}</span>
                            </li>
                        ))
                    }
                </ul>
              }
            </div>
            
        </div>


        {
            isOpen && <AddNote userID={userID} roomID={roomID} onClose={()=>setIsOpen(false)} />
        }


        </>
            
    )
}



