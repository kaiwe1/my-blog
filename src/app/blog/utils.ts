import path from "node:path";
import { cwd } from "node:process";
import fs from "node:fs";
import matter from "gray-matter";

export interface PostMeta {
    title: string;
    date: string;
    slug: string;

}

export function getAllPostsMeta(): PostMeta[] {
    const postsDir = path.join(cwd(), "/src/app/blog/posts");
    const files = fs.readdirSync(postsDir);
    return files.map(filename => {
        const filePath = path.join(postsDir, filename);
        const { data } = matter.read(filePath);
        return { ...data } as PostMeta
    })
}