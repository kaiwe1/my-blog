import { getAllPostsMetaData } from "./blog/lib/utils";
import { sideProjects } from "./lib/const";
import List from "./components/list";

export default function Home() {
  const allPostsMetaData = getAllPostsMetaData();

  return (
    <div>
      <section className="mb-12">
        <div className="flex text-4xl">Blog</div>
        <List
          items={allPostsMetaData}
          getKey={meta => meta.slug}
          getHref={meta => `/blog/${meta.slug}`}
          getTitle={meta => meta.title}
          getDescription={meta => meta.description}
        />
      </section>
      <section>
        <div className="text-4xl">Side Projects</div>
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
