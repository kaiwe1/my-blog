import { getAllPostsMetaData } from "./blog/lib/utils";
import { sideProjects } from "./lib/const";
import List from "./components/list";
import Link from "next/link";

export default function Home() {
  const allPostsMetaData = getAllPostsMetaData();

  return (
    <div>
      <section className="mb-12">
        <div className="flex text-2xl font-bold">Blog</div>
        <List
          items={allPostsMetaData}
          getKey={meta => meta.slug}
          getHref={meta => `/blog/${meta.slug}`}
          getTitle={meta => meta.title}
          getDescription={meta => meta.description}
          getReleaseTime={meta => meta.published_at}
        />
        <Link href="/blog" className="mt-8 inline-block hover:underline">View all posts →</Link>
      </section>
      <section>
        <div className="text-2xl font-bold">Side Projects</div>
        <List
          items={sideProjects}
          getKey={item => item.link}
          getHref={item => item.link}
          getTitle={item => item.name}
          getDescription={item => item.description}
        />
      </section>
    </div>
  );
}
