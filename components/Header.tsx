"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "@/app/global.module.css";

export const Header = () => {
  const pathName = usePathname();

  return (
    <header className={styles.globalHeader}>
      <Link href="/">
        <h1 className={styles.title}>Noob Front End Engineer Blog</h1>
      </Link>

      <div className={styles.links}>
        <Link
          className={
            pathName === "/" || pathName === "/posts"
              ? `${styles.active} ${styles.link}`
              : styles.link
          }
          href="/"
        >
          posts
        </Link>
        <Link
          className={
            pathName === "/contact"
              ? `${styles.active} ${styles.link}`
              : styles.link
          }
          href="/contact"
        >
          contact
        </Link>
      </div>
    </header>
  );
};
