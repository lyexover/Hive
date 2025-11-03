'use client'

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { io } from "socket.io-client";

const SocketContext = createContext(null)

export function ContextProvider({children, userID}){

        const socketRef = useRef(null)      //we create a reference in order to not trigger a re render in case of update

         useEffect(()=> {
            if(!userID){
                console.log('waiting for authentication...')
                return
            }

            socketRef.current = io('http://localhost:3000', {
                auth : {token : {id :userID}}, 
                 autoConnect: true,
            })

            const socket = socketRef.current

            socket.on('connect', ()=> {
                console.log('user connected')
            })



            return ()=> {                  // cleanup function when component unmounts
                if(socketRef.current)
                {
                  socketRef.current.disconnect()
                  socketRef.current = null
                }
                    
            }

         }, [userID])



         const value = {
             socket : socketRef.current
         }
    
         return (
            <SocketContext.Provider value={value} > 
                  {children}
            </SocketContext.Provider>

         )
}


export const useSocket = ()=> {
    const context = useContext(SocketContext)
    return context
}