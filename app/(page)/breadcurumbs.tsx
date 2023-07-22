"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathSegments = usePathname().split("/").filter(Boolean);

  const pathsAndSegments = pathSegments.map((segment, i) => ({
    path: "/" + pathSegments.slice(0, i + 1).join("/"),
    segment,
  }));

  return (
    <div className="flex gap-2">
      {pathsAndSegments.map(({ segment, path }, i) => (
        <Link
          className={`after:ml-2 after:text-zinc-400 after:content-['/'] last:after:content-none`}
          href={path}
          key={i}
        >
          {segment}
        </Link>
      ))}
    </div>
  );
}
