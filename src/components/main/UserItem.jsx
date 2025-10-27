'use client'
import { useState } from "react";
import { FaUser, FaCheck } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { SendRequest } from "@/app/actions/SendRequest";

export default function UserItem({user, sender}) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendRequest = async () => {
        setIsLoading(true);
        try {
            const result = await SendRequest(user.id, sender);
            if (result.success) {
                setIsSuccess(true);
            }
        } catch (error) {
            console.error('Failed to send friend request:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <li key={user.id}>
           <FaUser/> 
           <p>{user.first_name} {user.last_name}</p>
           <button 
               onClick={handleSendRequest}
               disabled={isSuccess || isLoading}
           >
               {isSuccess ? <FaCheck /> : <FaCirclePlus />}
           </button>
        </li>
    )
}