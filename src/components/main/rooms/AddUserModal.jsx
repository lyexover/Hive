'use client'
import { useState, useEffect } from "react"
import { GetAvailableFriendsForRoom } from "@/app/actions/GetNetwork"
import { AddToRoom } from "@/app/actions/AddToRoom"
import styles from '@/css-modules/main/rooms.module.css'
import { FaUser } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";

export default function AddUserModal({ roomID, userID, onClose }) {
  const [friends, setFriends] = useState([])
  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [adding, setAdding] = useState(null) // ID de l'ami en cours d'ajout

  useEffect(() => {
    async function getFriends() {
      setIsPending(true)
      try {
        const res = await GetAvailableFriendsForRoom(userID, roomID)
        if (res.success) {
          setFriends(res.data)
        } else {
          setMessage("Erreur lors du chargement des amis.")
        }
      } catch (err) {
        console.error(err)
        setMessage("Une erreur est survenue.")
      } finally {
        setIsPending(false)
      }
    }
    getFriends()
  }, [userID, roomID])

  // Fonction pour ajouter un ami à la room
  async function handleAdd(friendId) {
    setAdding(friendId)
    try {
      const res = await AddToRoom(friendId, roomID)

      if (res.success) {
        // On retire cet ami de la liste
        setFriends(prev => prev.filter(f => f.id !== friendId))
      } else {
        setMessage(res.message || "Impossible d’ajouter cet utilisateur.")
      }
    } catch (err) {
      console.error(err)
      setMessage("Erreur serveur lors de l’ajout.")
    } finally {
      setAdding(null)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className={styles.modalOverlay} onClick={onClose}></div>

      {/* Modal */}
      <div className={styles.addUserModal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h3 className={styles.modalTitle}>Ajouter un ami à la room</h3>

        <div className={styles.modalBody}>
          {message && <p className={styles.errorMessage}>{message}</p>}

          {isPending ? (
            <span>Chargement...</span>
          ) : friends.length === 0 ? (
            <p className={styles.noFriends}>Aucun ami disponible à ajouter.</p>
          ) : (
            <ul className={styles.friendList}>
              {friends.map(friend => (
                <li key={friend.id} className={styles.friendItem}>
                  <div className={styles.friendInfo}>
                    <FaUser size={20} />
                    <span>{friend.first_name} {friend.last_name}</span>
                  </div>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAdd(friend.id)}
                    disabled={adding === friend.id}
                  >
                    {adding === friend.id ? "..." : <MdGroupAdd size={22} />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
