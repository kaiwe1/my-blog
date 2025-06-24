import Link from "next/link";
import { getAllPostsMetaData } from "./blog/utils";

export default function Home() {
  const allPostsMetaData = getAllPostsMetaData();

  return (
    <div className="mx-48 mt-12">
      <div className="flex text-4xl">Blog</div>
      <ul>
        {
          allPostsMetaData.map((meta) => (
            <li key={meta.slug} className="mt-4">
              <Link className="text-2xl hover:underline" href={`/blog/${meta.slug}`}>{meta.title}</Link>
              <p className="mt-1 text-gray-500">
                <span>{meta.description}</span>
              </p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
