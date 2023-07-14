import Link from "next/link";

export default function MenubarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center gap-2 p-2">
      <nav className="flex w-full max-w-6xl justify-center gap-2 border-b border-zinc-300 p-2">
        <Link
          href={"/practice"}
          className="font-semibold text-sky-500 hover:underline"
        >
          practice
        </Link>
        <Link
          href={"/settings"}
          className="font-semibold text-sky-500 hover:underline"
        >
          settings
        </Link>
        <Link
          href={"/fonts"}
          className="font-semibold text-sky-500 hover:underline"
        >
          fonts
        </Link>
      </nav>
      <div>{children}</div>
    </main>
  );
}
