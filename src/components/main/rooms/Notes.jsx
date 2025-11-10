'use client'

import styles from '@/css-modules/main/rooms.module.css'
import { FaRegNoteSticky } from "react-icons/fa6";

import { RiStickyNoteAddLine } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddNote from './AddNote';
import { useSocket } from "@/context/useSocket"

export default function Notes({initialNotes, roomID, userID}){

    const { socket } = useSocket()
    const [isOpen, setIsOpen] = useState(false)
    const [notes, setNotes] = useState(initialNotes)
    const COLORS_COUNT = 6; // Number of color variants for cards


    // ✅ Listens for newNote (from other users) OR noteAdded (from creator's modal)
    useEffect(() => {
        if (!socket) return

        const handleNewNote = (note) => {


            setNotes((prev) => {
                // Prevent duplicates (useful if a note is added via both channels, 
                // but with the server change, 'newNote' should only be from others)
                const exists = prev.some(n => n.id === note.id)
                if (exists) return prev
                return [note, ...prev]
            })
        }

        // We listen for both here because the AddNote component (child) will
        // use 'setNotes' (prop) to update this parent's state directly for the creator,
        // while others use the 'newNote' broadcast.
        socket.on('newNote', handleNewNote)

        return () => {
            socket.off('newNote', handleNewNote)
        }
    }, [socket])

    return (
        <>
            <div className={styles.notesContainer}>
                <div className={styles.head}>
                   <h4><FaRegNoteSticky size={21}/> Sticky Notes</h4>
                   <button onClick={() => setIsOpen(true)}>
                       <RiStickyNoteAddLine size={21}/>
                   </button>
                </div>

                <div className={styles.notesList}>
                  {
                    notes.length === 0 ? <span>No notes to display..</span> : 
                    <ul>
                        {
                            notes.map((note,i) => (
                                <li key={note.id} className={styles[`card-color-${i % COLORS_COUNT}`]}>
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
                isOpen && (
                    <AddNote 
                        userID={userID} 
                        roomID={roomID} 
                        // The creator's immediate update logic is here (passed down)
                        setNotes={setNotes} 
                        onClose={() => setIsOpen(false)} 
                    />
                )
            }
        </>
    )
}