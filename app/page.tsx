import Link from "next/link";
import { getPosts } from "@/libs/mdxDataFetcher";

export default function Page() {
  const contents = getPosts();

  return (
    <main>
      <div>
        {contents.map(
          (
            { title, tags, publishDate, updatedDate, description, slug },
            index,
          ) => (
            <Link key={index} href={`/posts/${slug}`}>
              <header>
                <h3>{title}</h3>
                <div>
                  <small>公開日: {publishDate}</small>
                  <small>更新日: {updatedDate}</small>
                </div>
              </header>
              <div>
                {tags.map((tag, index) => (
                  <p key={index}>{tag}</p>
                ))}
              </div>
              <p>{description}</p>
            </Link>
          ),
        )}
      </div>
    </main>
  );
}
