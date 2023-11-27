import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

type Post = {
  title: string;
  tags: string[];
  publishDate: string;
  updatedDate: string;
  description: string;
  slug: string;
};

// 一覧取得
export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "contents");
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true });

  const posts = fileNames.map(({ name }) => {
    const file = fs.readFileSync(`${postsDirectory}/${name}`, "utf8");
    const {
      data: { title, tags, publishDate, updatedDate, description },
    } = matter(file);

    const checkTagsType = (tags: any): tags is string[] => {
      if (Array.isArray(tags)) {
        return tags.every((tag) => typeof tag === "string");
      }
      return false;
    };

    return {
      title: typeof title === "string" ? title : "",
      tags: checkTagsType(tags) ? tags : [],
      publishDate: typeof publishDate === "string" ? publishDate : "",
      updatedDate: typeof updatedDate === "string" ? updatedDate : "",
      description: typeof description === "string" ? description : "",
      slug: name.split(".").at(-2) || "",
    };
  });

  return posts;
}

// 記事詳細取得
export function getPostDitails(fileName: string): Post {
  const file = fs.readFileSync(
    path.join(process.cwd(), `contents/${fileName}.mdx`),
    "utf8",
  );

  const {
    data: { title, tags, publishDate, updatedDate, description },
  } = matter(file);

  const checkTagsType = (tags: any): tags is string[] => {
    if (Array.isArray(tags)) {
      return tags.every((tag) => typeof tag === "string");
    }
    return false;
  };

  return {
    title: typeof title === "string" ? title : "",
    tags: checkTagsType(tags) ? tags : [],
    publishDate: typeof publishDate === "string" ? publishDate : "",
    updatedDate: typeof updatedDate === "string" ? updatedDate : "",
    description: typeof description === "string" ? description : "",
    slug: fileName.split(".").at(-2) || "",
  };
}

// 記事コンテンツ取得
export function getPostContent(fileName: string) {
  const filePath = path.join(process.cwd(), `contents/${fileName}.mdx`);
  const file = fs.readFileSync(filePath, "utf8");
  const { content } = matter(file);

  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(String(content));
}
