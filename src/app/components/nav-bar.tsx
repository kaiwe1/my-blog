import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="py-6 px-12 border-b border-gray-200">
            <div className="text-2xl">
                <Link href="/" className="mr-6 hover:underline">Home</Link>
                <Link href="/about" className="mr-6 hover:underline">About</Link>
            </div>
        </nav>)
}