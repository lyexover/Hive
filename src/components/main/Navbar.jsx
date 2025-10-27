'use client'

import { MdHive } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoAddCircle, IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from '@/css-modules/main/navbar.module.css';
import { getRoomsByUserId } from "@/app/actions/GetRooms";

export default function Navbar({ user }) {
    const pathname = usePathname();
    const [rooms, setRooms] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        async function loadRooms() {
            const loadedRooms = await getRoomsByUserId(user.id);
            if (loadedRooms.success) {
                setRooms(loadedRooms.data);
            } else {
                console.error('Failed to load rooms:', loadedRooms.error);
            }
        }

        loadRooms();
    }, [user]);

    const isActive = (path) => {
        return pathname === path ; 
    };

    return (
        <>
            {/* Mobile Navbar */}
            <nav className={styles.mobileNavbar}>
                <MdHive size={35} className={styles.logo} />
                <button 
                    className={styles.hamburger}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <RiMenu3Fill size={28} />
                </button>
            </nav>

            {/* Desktop Navbar */}
            <nav className={`${styles.navbar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                <MdHive size={45} className={styles.logo} />
                
                <ul>
                    <li className={isActive('/dashboard') ? styles.active : ''}>
                        <Link href="/dashboard">
                            <TbLayoutDashboardFilled size={30} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    
                    {/* Rooms Dropdown */}
                    <li className={isActive('/rooms') ? styles.active : ''}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <span>
                                <BsPeople size={30} />
                                Rooms
                                {isDropdownOpen ? 
                                    <FaChevronUp size={12} className={styles.chevron} /> : 
                                    <FaChevronDown size={12} className={styles.chevron} />
                                }
                            </span>
                        </button>

                        {/* Dropdown avec classe conditionnelle pour l'animation */}
                        {rooms.length > 0 && (
                            <ul className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}>
                                {rooms.map((room) => (
                                    <li 
                                        key={room.id}
                                        className={pathname === `/rooms/${room.id}` ? styles.active : ''}
                                    >
                                        <Link href={`/rooms/${room.id}`}>
                                            {room.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <li className={isActive('/dashboard/users') ? styles.active : ''}>
                        <Link href="/dashboard/users">
                            <IoAddCircle size={30} />
                            <span>Users</span>   
                        </Link>
                    </li>
                </ul>

                <footer className={styles.footer}>
                    <span>
                        <FaUser /> {user.first_name} {user.last_name}
                    </span>
                    <div className={styles.footerActions}>
                        <Link href="/settings">
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

            {/* Overlay pour fermer le menu mobile */}
            {isMobileMenuOpen && (
                <div 
                    className={styles.overlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}