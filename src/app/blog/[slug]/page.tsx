import { cwd } from 'node:process'
import path from 'node:path';
import matter from 'gray-matter';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const postsDir = path.join(cwd(), "/src/app/blog/posts")
    const filePath = path.join(postsDir, `${slug}.md`);
    const { data, content } = matter.read(filePath)

    console.log('content', content);

    return (
        <div className="mx-48 mt-24">
            <h1 className="text-4xl">{data.title}</h1>
            <div className="text-gray-500 mt-2">{data.date}</div>
            <div className="mt-6 text-xl" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}