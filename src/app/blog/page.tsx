import List from "../components/list";
import { getAllPostsMetaData } from "./lib/utils";

export default function BlogListPage() {
  const posts = getAllPostsMetaData();
  return (
    <div className="mx-48 my-12">
      <h1 className="text-4xl font-bold mb-8">博客列表</h1>
      <List
        items={posts}
        getKey={item => item.slug}
        getHref={item => `/blog/${item.slug}`}
        getTitle={item => item.title}
        getDescription={item => item.description}
      />
    </div>
  );
}
