'use client'
import { GetNetwork } from "@/app/actions/GetNetwork"
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import styles from '@/css-modules/main/users.module.css'
import FriendModal from "./FriendModal";


export default function MyNetwork({id}){

      const [network, setNetwork] = useState([])
      const [selectedUser, setSelectedUser] = useState(null)

     useEffect(() => {

      async function fetchNetwork(){
         const response = await GetNetwork(id)
         setNetwork(response)
      }


     fetchNetwork()
     }, [id])


      const message = network?.data?.length==0 ? 'No Friend to display' : network?.success == false ? 'Erreur serveur' : undefined

    return (
        <div className={styles.myNetwork}>
          <h4>My network</h4>
          <ul>
           {
            message ? <span>{message}</span>
            : 
             network?.data?.map(n => (
                <li key={n.id}>

                   <div className={styles.userInfo}>
                      <FaUser/> 
                      <p>{n.first_name} {n.last_name}</p>
                   </div>
                  
                  <button onClick={()=>setSelectedUser(n)} >
                      <IoInformationCircle/>
                  </button>
               </li>
             ))
            
        }
          </ul>
               
               {
                  selectedUser && (
                     <FriendModal user={selectedUser} onClose={()=> setSelectedUser(null)}/>
                  )
               }

        </div>
    )
}