import Link from "next/link";
import React from "react";
import styles from "@/app/global.module.css";

type HeaderProps = {
  page: "index" | "contact";
};

export const Header = ({ page }: HeaderProps) => {
  return (
    <header className={styles.globalHeader}>
      <Link href="/">
        <h1 className={styles.title}>Noob Front End Engineer Blog</h1>
      </Link>

      <div className={styles.links}>
        <Link
          className={
            page === "index" ? `${styles.active} ${styles.link}` : styles.link
          }
          href="/"
        >
          blog
        </Link>
        <Link
          className={
            page === "contact" ? `${styles.active} ${styles.link}` : styles.link
          }
          href="/contact/"
        >
          contact
        </Link>
      </div>
    </header>
  );
};
