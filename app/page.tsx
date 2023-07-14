import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-3 ">
      <Link href={"practice"}>
        <h1 className="shadow-0 -rotate-2 bg-sky-600 p-2 text-center text-xl font-bold shadow-lg shadow-sky-400/20 hover:underline">
          WE ARE GONNA DO SOME WRITING PRACTICE WOW
        </h1>
      </Link>
    </main>
  );
}
