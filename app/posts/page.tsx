import Link from "next/link";
import { getFrontMatter } from "@/libs/mdxDataFetcher";
import { SideDecoration } from "@/components/SideDecoration";
import styles from "./page.module.css";

export default function Home() {
  const contents = getFrontMatter({ type: "posts" });

  return (
    <>
      <SideDecoration />
      <div className={styles.main}>
        <h1>Posts</h1>
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
      </div>
    </>
  );
}
