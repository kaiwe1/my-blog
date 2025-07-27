import Markdown from 'react-markdown';
import "github-markdown-css"
import { getPostBySlug } from '../lib/utils';

const markdownComponents = {
    img: ({ node, ...props }: any) => (
        <span style={{ display: 'block', textAlign: 'center', margin: '2em 0' }}>
            <img {...props} style={{ maxWidth: '800px', height: 'auto', display: 'inline-block' }} />
        </span>
    )
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { meta, content } = getPostBySlug(slug)

    return (
        <div>
            <section className='mb-5'>
                <div className="text-4xl font-medium">{meta.title}</div>
                <div className='flex gap-3 text-sm text-gray-500 my-4'>
                    <div>Published {meta.published_at}</div>
                    <div>Upadted {meta.updated_at}</div>
                    <div>{meta.tag}</div>
                </div>
            </section>
            <main className="markdown-body">
                <Markdown components={markdownComponents}>{content}</Markdown>
            </main>
        </div>
    )
}