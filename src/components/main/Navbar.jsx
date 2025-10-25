import { MdHive } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import RoomsDropDown from "./RoomsDropDown";
import { auth } from "../../../auth";





async function fetchRooms(user){


    try {

        const res = await fetch(`http://localhost:3000/api/rooms/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        return data;
    }

    catch(err){
        console.log(err.message);
        return [];
        
}
}





export default async function Navbar(){

    const {user} = await auth();
    console.log('Navbar user:')
    console.log(user)

    return (
        <nav>
            <MdHive size={35} />
            <ul>
                <li>
                    <Link href="dashboard">
                        <TbLayoutDashboardFilled size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                
                <RoomsDropDown rooms={await fetchRooms(user)} />

                <li>
                    <Link href="users">
                        <IoIosAddCircle size={20} />
                        <span>Users</span>   
                    </Link>
                </li>
                
            </ul>

            <footer>

                <span>{user.first_name} {user.last_name}</span>
                <div>
                    <Link href="settings">
                        <IoSettingsSharp size={20} />
                        Settings
                    </Link>
                    <button>
                        <IoLogOut size={20} />
                        Logout
                    </button>
                </div>


            </footer>
        </nav>
    )

}