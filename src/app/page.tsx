import Link from "next/link";
import { getAllPostsMeta } from "./blog/utils";

export default function Home() {
  const allPostsMeta = getAllPostsMeta();

  return (
    <div className="mx-48 mt-24">
      <div className="flex text-4xl">Blogs</div>
      <ul>
        {
          allPostsMeta.map((meta) => (
            <li key={meta.slug} className="text-2xl mt-4">
              <Link href={`/blog/${meta.slug}`}>{meta.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
