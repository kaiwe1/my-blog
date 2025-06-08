import Markdown from 'react-markdown';
import "github-markdown-css"
import { getPostBySlug } from '../utils';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { meta, content } = getPostBySlug(slug)

    return (
        <div className="mx-48 mt-12">
            <h1 className="text-4xl">{meta.title}</h1>
            <div className="text-gray-500 my-4">{meta.date}</div>
            <div className="markdown-body">
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}