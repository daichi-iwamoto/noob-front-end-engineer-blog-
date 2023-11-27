import fs from "fs";
import path from "path";
import { Header } from "@/components/Header";
import styles from "./page.module.css";
import { getPostDitails, getPostContent } from "@/libs/mdxDataFetcher";

// ビルド時に静的なパスを生成する
export function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "contents");
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true });

  return fileNames.map(({ name }) => ({ slug: name.split(".").at(-2) }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function Home({ params: { slug } }: Props) {
  const { title, tags, publishDate, updatedDate } = getPostDitails(slug);
  const { value } = await getPostContent(slug);

  return (
    <main className={styles.post}>
      <Header page="index" />
      <div className={styles.contentHeader}>
        <div className={styles.title}>{title}</div>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <p key={index} className={styles.tag}>
              {tag}
            </p>
          ))}
        </div>
        <small className={styles.publishDate}>公開日: {publishDate}</small>
        <small className={styles.updatedDate}>更新日: {updatedDate}</small>
      </div>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: String(value) }} />
      </div>
    </main>
  );
}
