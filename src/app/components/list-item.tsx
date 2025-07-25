import Link from "next/link";

function ListItem({ href, title, description, releaseTime }: { href: string, title: string, description: string, releaseTime?: string }) {
  return (
    <li className="mt-4">
      <Link className="text-xl hover:underline" href={href}>{title}</Link>
      {releaseTime && <p className="text-gray-500 mt-2 text-sm">{releaseTime}</p>}
      <p className="mt-2 text-gray-900">
        <span>{description}</span>
      </p>
    </li>
  );
}

export default ListItem