import fs from "fs";
import path from "path";
import styles from "./page.module.css";
import { getDitails, getContent } from "@/libs/mdxDataFetcher";

// ビルド時に静的なパスを生成する
export function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "contents/tips");
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true });

  return fileNames.map(({ name }) => ({ slug: name.split(".").at(-2) }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function Home({ params: { slug } }: Props) {
  const { title, tags, publishDate, updatedDate } = getDitails({
    type: "tips",
    fileName: slug,
  });
  const { value } = await getContent({ type: "tips", fileName: slug });

  return (
    <div className={styles.post}>
      <div className={styles.contentHeader}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <p key={index} className={styles.tag}>
              {tag}
            </p>
          ))}
        </div>
        <div className={styles.dates}>
          <div className={styles.publishDate}>公開日: {publishDate}</div>
          <div className={styles.updatedDate}>更新日: {updatedDate}</div>
        </div>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
