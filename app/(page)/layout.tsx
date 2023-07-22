import BackButton from "./back-button";
import Breadcrumbs from "./breadcurumbs";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center gap-2 p-2">
      <nav className="flex w-full max-w-6xl gap-2 border-b border-zinc-400 p-2">
        <BackButton />
        <hr className="block h-auto w-0 border-l border-zinc-400" />
        <Breadcrumbs />
      </nav>
      <div>{children}</div>
    </main>
  );
}
