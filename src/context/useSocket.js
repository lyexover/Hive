'use client'

import { createContext, useContext, useState, useEffect } from "react"
import { io } from "socket.io-client";

const SocketContext = createContext(null)

export function ContextProvider({children, userID}){

    const [socket, setSocket] = useState(null)  // ✅ Use state instead of ref
    const [isConnected, setIsConnected] = useState(false)  // ✅ Track connection status

    useEffect(() => {
        if(!userID){
            console.log('waiting for authentication...')
            return
        }

        const newSocket = io('http://localhost:3000', {
            auth: { token: { id: userID } }, 
            autoConnect: true,
        })

        newSocket.on('connect', () => {
            console.log('user connected')
            setIsConnected(true)  // ✅ Update connection state
        })

        newSocket.on('disconnect', () => {
            console.log('user disconnected')
            setIsConnected(false)  // ✅ Track disconnection
        })

        setSocket(newSocket)  // ✅ Set socket in state

        return () => {
            newSocket.disconnect()
            setSocket(null)
            setIsConnected(false)
        }

    }, [userID])

    const value = {
        socket,
        isConnected  // ✅ Expose connection status
    }

    return (
        <SocketContext.Provider value={value}> 
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}