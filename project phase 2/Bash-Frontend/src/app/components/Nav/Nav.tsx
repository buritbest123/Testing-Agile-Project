import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Using Next.js Image component
import { AiOutlineMenu } from "react-icons/ai"; // Hamburger icon
import styles from "./Nav.module.css";

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <main>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Montserrat:wght@400;700&display=swap"
      />
      <header className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/Bash-Logo.png"
              alt="Brand Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <li>
            <Link href="/cart">CART</Link>
          </li>
          <li>
            <Link href="/">MENU</Link>
          </li>
        </ul>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <AiOutlineMenu />
        </div>
      </header>
    </main>
  );
};

export default Nav;
