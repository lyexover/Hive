'use client'

import { useState } from "react"
import { useSocket } from "@/context/useSocket"
import styles from '@/css-modules/main/rooms.module.css'
import { IoMdClose } from 'react-icons/io'

export default function AddNote({ userID, roomID, onClose }) {

    const { socket } = useSocket()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState(null)

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

        // Emit to socket.io server
        socket.emit('addNote', {
            content: content.trim(),
            userID,
            roomID
        })

        // Listen for response
        socket.once('noteAdded', (response) => {
            setIsSubmitting(false)
            
            if (response.success) {
                setMessage({ success: true, text: response.message || 'Note added successfully!' })
                e.target.reset()
                
                // Close modal after 1.5 seconds
                setTimeout(() => {
                    onClose()
                }, 1500)
            } else {
                setMessage({ success: false, text: response.message || 'Failed to add note.' })
            }
        })

        // Timeout fallback
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