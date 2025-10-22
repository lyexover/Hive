'use client'

import { MdHive } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import styles from '@/css-modules/header.module.css';
import { useState } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (linkName) => {
    setActiveLink(linkName);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <MdHive size={35} />
        <span>Hive</span>
      </div>

      <button className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <IoClose size={28} /> : <HiMenuAlt3 size={28} />}
      </button>

      <div className={`${styles.links} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <a
          href="#"
          onClick={() => handleClick("home")}
          className={activeLink === "home" ? styles.active : ""}
        >
          Home
        </a>

        <a
          href="#"
          onClick={() => handleClick("product")}
          className={activeLink === "product" ? styles.active : ""}
        >
          Product
        </a>

        <a
          href="#"
          onClick={() => handleClick("about")}
          className={activeLink === "about" ? styles.active : ""}
        >
          About us
        </a>

        <a
          href="#"
          onClick={() => handleClick("faq")}
          className={activeLink === "faq" ? styles.active : ""}
        >
          FAQ
        </a>

        <div className={styles.mobileActions}>
          <Link className={styles.signin} href="/auth/signup" onClick={() => setMenuOpen(false)}>Join Now</Link>
          <Link className={styles.login} href="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      </div>

      <div className={styles.actions}>
        <Link className={styles.signin} href="/auth/signup">Join Now</Link>
        <Link className={styles.login} href="/auth/login">Login</Link>
      </div>
    </header>
  );
}