import Markdown from 'react-markdown';
import "github-markdown-css"
import { getPostBySlug } from '../utils';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { meta, content } = getPostBySlug(slug)

    return (
        <div className="mx-48 my-12">
            <div className="text-4xl">{meta.title}</div>
            <div className='date flex gap-3 text-sm'>
                <div className="text-gray-500 my-4">Published {meta.published_at}</div>
                <div className="text-gray-500 my-4">Upadted {meta.updated_at}</div>
            </div>
            <div className="markdown-body">
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}