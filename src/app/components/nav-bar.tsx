import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="py-6 px-12 border-b border-gray-200 flex items-center">
            <Link href="/" className="text-2xl mr-12 hover:underline">KZ</Link>
            <div className="flex-1 flex justify-center">
                <Link href="/blog" className="mr-12 hover:underline">Blog</Link>
                <Link href="/about" className="mr-12 hover:underline">About</Link>
            </div>
        </nav>)
}