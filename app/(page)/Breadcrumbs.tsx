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
    <div className="flex gap-4">
      {pathsAndSegments.map(({ segment, path }, i) => (
        <Link
          className={
            "relative after:absolute after:-right-3 after:text-zinc-400 after:content-['/'] last:after:content-none hover:underline" +
            (i === 0 ? " font-semibold" : "")
          }
          href={path}
          key={i}
        >
          {segment}
        </Link>
      ))}
    </div>
  );
}
