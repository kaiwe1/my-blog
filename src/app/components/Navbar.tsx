import Link from 'next/link'

export default function NavBar() {
    return (
        <nav className="py-6 px-48 border-b border-gray-200">
            <div className="text-2xl">
                <Link href="/" className="mr-8 hover:underline">Kaiwei</Link>
            </div>
        </nav>)
}