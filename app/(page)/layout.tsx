import BackButton from "@/components/back-button";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center gap-2 p-2">
      <nav className="w-full max-w-6xl gap-2 border-b border-zinc-300 p-2">
        <BackButton />
      </nav>
      <div>{children}</div>
    </main>
  );
}
