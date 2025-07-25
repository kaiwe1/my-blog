import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="py-6 px-12 border-b border-gray-200">
            <Link href="/" className="text-2xl mr-12 hover:underline">KZ</Link>
            <Link href="/about" className="text-2xl mr-12 hover:underline">About</Link>
        </nav>)
}