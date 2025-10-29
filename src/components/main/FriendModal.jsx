'use client'

import styles from '@/css-modules/main/users.module.css'
import { FaUser, FaEnvelope, FaTimes } from "react-icons/fa";

export default function FriendModal({user, onClose}){

    if (!user) return null;

    return (
        <>
            {/* Overlay */}
            <div className={styles.modalOverlay} onClick={onClose}></div>
            
            {/* Modal */}
            <div className={styles.friendModal}>
                <button 
                    className={styles.closeBtn} 
                    onClick={onClose}
                    aria-label="Fermer"
                >
                    <FaTimes />
                </button>

                <div className={styles.modalHeader}>
                    <div className={styles.avatarCircle}>
                        <FaUser size={40} />
                    </div>
                    <h4>{user.first_name} {user.last_name}</h4>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>
                            <FaUser size={14} />
                            <span>Prénom</span>
                        </div>
                        <p>{user.first_name}</p>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>
                            <FaUser size={14} />
                            <span>Nom</span>
                        </div>
                        <p>{user.last_name}</p>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>
                            <FaEnvelope size={14} />
                            <span>Email</span>
                        </div>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}