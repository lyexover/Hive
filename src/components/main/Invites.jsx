'use client'

import styles from '@/css-modules/main/users.module.css'
import GetInvites from '@/app/actions/GetInvites'
import { useState, useEffect } from 'react'
import { TiDelete } from "react-icons/ti";
import { FaUser, FaCheck } from "react-icons/fa";
import updateFriend from '@/app/actions/UpdateFriend';


export default function Invites({id}){

  const [invites, setInvites] = useState([])
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  const message = invites?.success == true && invites?.data?.length == 0 ? 'No new invites' : invites?.success == false ? 'erreur server' : undefined 
  

  useEffect(() => {
    async function fetchInvites(id){
       const res = await GetInvites(id)
       setInvites(res)
    }

    fetchInvites(id)
  }, [id])

  async function handleInvites(reqID, sendID, recID, op){
    // Réinitialiser les messages
    setError(null)
    setSuccessMessage(null)

    try {
      const res = await updateFriend({
        requestID: reqID, 
        senderID: sendID, 
        receiverID: recID, 
        operation: op
      })

      if (res.success) {
        // Afficher un message de succès
        setSuccessMessage(op === 'accept' ? 'Invitation acceptée !' : 'Invitation refusée')
        
        // Retirer l'invitation de la liste
        setInvites(prev => ({
          ...prev,
          data: prev.data.filter(invite => invite.id !== reqID)
        }))

        // Effacer le message après 3 secondes
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        // Afficher le message d'erreur du serveur
        setError(res.message || 'Une erreur est survenue')
      }
    }
    catch(err){
      console.error('Erreur lors de la mise à jour:', err)
      setError('Erreur de connexion au serveur')
    }
  }

  return (
    <div className={styles.invites}>
      <h4>Invites</h4>
      
      {/* Messages d'erreur et de succès */}
      {error && <div className={styles.errorMessage}>{error}</div>}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      
      {message && <span>{message}</span>}
      
      <ul>
        {
          invites?.success && invites?.data?.map((invite) => (
            <li key={invite.id} className={styles.inviteItem}>
              <div className={styles.inviteInfo}>
                <FaUser size={20} className={styles.userIcon} />
                <span className={styles.userName}>
                  {invite.first_name} {invite.last_name}
                </span>
              </div>
              <div className={styles.inviteActions}>
                <button 
                  className={styles.acceptBtn}
                  onClick={() => handleInvites(invite.id, invite.sender_id, invite.receiver_id, 'accept')}
                  aria-label="Accepter l'invitation"
                >
                  <FaCheck size={18} />
                </button>
                <button 
                  className={styles.rejectBtn}
                  onClick={() => handleInvites(invite.id, null, null, 'reject')}
                  aria-label="Refuser l'invitation"
                >
                  <TiDelete size={18} />
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}