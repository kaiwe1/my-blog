import path from "node:path";
import { cwd } from "node:process";
import fs from "node:fs";
import matter from "gray-matter";

export interface PostMeta {
    title: string;
    published_at: string;
    updated_at: string;
    slug: string;
    tag: Array<string>
    description: string
}

// 获取所有帖子的Meta数据
export function getAllPostsMetaData(): PostMeta[] {
    const postsDir = path.join(cwd(), "/src/app/blog/posts");
    const files = fs.readdirSync(postsDir);
    const posts = files.map(filename => {
        const filePath = path.join(postsDir, filename);
        const { data } = matter.read(filePath);
        return { ...data } as PostMeta
    })
    posts.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    return posts;
}

// 通过Slug获取帖子metadata和内容数据
export function getPostBySlug(slug: string) {
    const postsDir = path.join(cwd(), "/src/app/blog/posts")
    const filePath = path.join(postsDir, `${slug}.md`);
    const { data, content } = matter.read(filePath);

    return { meta: data as PostMeta, content }
}