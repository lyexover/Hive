'use client'

import { useState, useEffect } from "react"
import { useSocket } from "@/context/useSocket"
import styles from '@/css-modules/main/rooms.module.css'
import { IoMdClose } from 'react-icons/io'

export default function AddNote({ userID, roomID, onClose, setNotes }) {

    const { socket } = useSocket()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)

    // ✅ Setup listener for noteAdded (confirmation for creator)
    useEffect(() => {
        if (!socket) return

        // For the creator only (personal confirmation + immediate UI update)
        const handleNoteAdded = (response) => {
            setIsSubmitting(false)
            
            if (response.success) {
                setMessage({ success: true, text: response.message || 'Note added successfully!' })
                
                // ⭐️ CHANGE: Add the note immediately using the prop from the parent
                // (This is the exclusive update path for the creator)
                if (response.note) {
                    setNotes((prev) => [response.note, ...prev])
                }
                
                // Close modal after showing success message
                setTimeout(() => {
                    onClose()
                }, 1500)
            } else {
                setMessage({ success: false, text: response.message || 'Failed to add note.' })
            }
        }

        socket.on('noteAdded', handleNoteAdded)

        // ✅ Cleanup on unmount
        return () => {
            socket.off('noteAdded', handleNoteAdded)
        }
    }, [socket, onClose, setNotes])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!socket) {
            setMessage({ success: false, text: 'Connection error. Please try again.' })
            return
        }

        const formData = new FormData(e.target)
        const content = formData.get('content')

        if (!content.trim()) {
            setMessage({ success: false, text: 'Note content cannot be empty.' })
            return
        }

        setIsSubmitting(true)
        setMessage(null)

        // ✅ Emit addNote event
        socket.emit('addNote', {
            content: content.trim(),
            userID,
            roomID
        })

        // Reset form
        e.target.reset()

        // Timeout fallback in case server doesn't respond
        setTimeout(() => {
            if (isSubmitting) {
                setIsSubmitting(false)
                setMessage({ success: false, text: 'Request timeout. Please try again.' })
            }
        }, 5000)
    }

    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose}></div>

            <div className={styles.addUserModal}>
                
                <button 
                    className={styles.closeBtn}
                    onClick={onClose}
                    type="button"
                    aria-label="Close modal"
                >
                    <IoMdClose size={20} />
                </button>

                <h3 className={styles.modalTitle}>Add New Note</h3>

                <div className={styles.modalBody}>
                    
                    {message?.success === false && (
                        <p className={styles.errorMessage}>
                            {message.text}
                        </p>
                    )}

                    {message?.success === true && (
                        <p className={styles.successMessage}>
                            {message.text}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className={styles.noteForm}>
                        <textarea 
                            name="content" 
                            placeholder="Enter your note..."
                            required
                            rows={6}
                            className={styles.noteTextarea}
                            disabled={isSubmitting}
                        ></textarea>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.submitBtn}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Note'}
                        </button>
                    </form>
                </div>

            </div>
        </>
    )
}