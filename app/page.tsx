import Link from "next/link";
import { Header } from "@/components/Header";
import { getPosts } from "@/libs/mdxDataFetcher";
import styles from "./page.module.css";

export default function Home() {
  const contents = getPosts();

  return (
    <main className={styles.main}>
      <Header page="index" />
      <div className={styles.postList}>
        {contents.map(
          (
            { title, tags, publishDate, updatedDate, description, slug },
            index,
          ) => (
            <Link key={index} href={`/posts/${slug}`} className={styles.post}>
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
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <p key={index} className={styles.tag}>
                    {tag}
                  </p>
                ))}
              </div>
              <p className={styles.description}>{description}</p>
            </Link>
          ),
        )}
      </div>
    </main>
  );
}
