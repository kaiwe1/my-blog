import Link from "next/link";

function ListItem({ href, title, description }: { href: string, title: string, description: string }) {
  return (
    <li className="mt-4">
      <Link className="text-2xl hover:underline" href={href}>{title}</Link>
      <p className="mt-1 text-gray-500">
        <span>{description}</span>
      </p>
    </li>
  );
}

export default ListItem