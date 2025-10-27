'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { IoSearch } from "react-icons/io5";



export default function SearchInput() {

    const searchParams= useSearchParams()
    const pathname= usePathname()
    const {replace}= useRouter()

    
    function handleSearch(term){

        const params = new URLSearchParams(searchParams); 
        if(term){
            params.set('search', term);
        }
        else{
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`)

    }


    return (

        <div>
            <input onChange={(e)=>handleSearch(e.target.value)} type="text" placeholder="Enter an email, first or last name.." />
            <IoSearch />
        </div>
        

    )
}