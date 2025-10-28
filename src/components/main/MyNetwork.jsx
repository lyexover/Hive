'use client'
import { GetNetwork } from "@/app/actions/GetNetwork"
import { FaUser } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import styles from '@/css-modules/main/users.module.css'


export default function MyNetwork({id}){

      const [network, setNetwork] = useState([])

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
                      <p>{user.first_name} {user.last_name}</p>
                   </div>
                  
                  <button >
                      <IoInformationCircle/>
                  </button>
               </li>
             ))
            
        }
          </ul>
        </div>
    )
}