'use client'

import styles from '@/css-modules/main/users.module.css'
import GetInvites from '@/app/actions/GetInvites'
import { useState, useEffect } from 'react'
import { TiDelete } from "react-icons/ti";
import { FaUser, FaCheck } from "react-icons/fa";

export default function Invites({id}){

  const [invites, setInvites] = useState([])
  const message = invites?.success == true && invites?.data?.length == 0 ? 'No new invites' : invites?.success == false ? 'erreur server' : undefined 

    useEffect(() => {

          async function fetchInvites(id){
             const res = await GetInvites(id)
             setInvites(res)
          }

          fetchInvites(id)

    }, [id])




    return (
        <div className={styles.invites}>
          <h4>Invites</h4>
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
                      onClick={() => {}}
                      aria-label="Accepter l'invitation"
                    >
                      <FaCheck size={18} />
                    </button>
                    <button 
                      className={styles.rejectBtn}
                      onClick={() => {}}
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