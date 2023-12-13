import fs from "fs";
import path from "path";
import { Source_Code_Pro } from "next/font/google";
import styles from "./page.module.css";
import { getPostDitails, getPostContent } from "@/libs/mdxDataFetcher";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

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
    <div className={`${styles.post} ${sourceCodePro.className}`}>
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
