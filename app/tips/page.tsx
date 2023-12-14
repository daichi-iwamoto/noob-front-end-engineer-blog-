import Link from "next/link";
import { getFrontMatter } from "@/libs/mdxDataFetcher";
import { SideDecoration } from "@/components/SideDecoration";
import styles from "./page.module.css";

export default function Home() {
  const contents = getFrontMatter({ type: "tips" });

  return (
    <>
      <SideDecoration />
      <div className={styles.main}>
        <h1>Tips</h1>
        <div className={styles.tipsList}>
          {contents.map(
            ({ title, tags, publishDate, updatedDate, slug }, index) => (
              <Link key={index} href={`/tips/${slug}`} className={styles.tips}>
                <header className={styles.header}>
                  <h3 className={styles.title}>{title}</h3>
                  <div className={styles.date}>
                    <small className={styles.publishDate}>
                      公開日: {publishDate}
                    </small>
                    <small className={styles.updatedDate}>
                      更新日: {updatedDate}
                    </small>
                  </div>
                </header>
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
}
