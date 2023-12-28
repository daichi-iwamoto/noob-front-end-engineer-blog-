import fs from "fs";
import path from "path";
import styles from "./page.module.css";
import { getDitails, getContent } from "@/libs/mdxDataFetcher";

type Props = {
  params: {
    slug: string;
  };
};

// ビルド事にメタデータを設定する
export async function generateMetadata({ params: { slug } }: Props) {
  const { title, description, tags, publishDate, updatedDate } = getDitails({
    type: "posts",
    fileName: slug,
  });

  return {
    title,
    description,
  };
}

// ビルド時に静的なパスを生成する
export function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "contents/posts");
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true });

  return fileNames.map(({ name }) => ({ slug: name.split(".").at(-2) }));
}

export default async function Home({ params: { slug } }: Props) {
  const { title, tags, publishDate, updatedDate } = getDitails({
    type: "posts",
    fileName: slug,
  });

  const { value } = await getContent({ type: "posts", fileName: slug });

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
