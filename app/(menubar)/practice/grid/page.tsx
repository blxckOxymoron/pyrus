import Link from "next/link";
import { canvasHeight, canvasWidth } from "../constants";

export default function PracticeGrid() {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

  return (
    <div className="flex flex-wrap gap-4">
      {letters.map((letter) => (
        <Link
          href={"/practice#letter-" + letter}
          key={letter}
          style={{ width: canvasWidth, height: canvasHeight }}
          className="flex items-center justify-center rounded-lg border border-zinc-400 text-zinc-400 transition-colors hover:text-white"
        >
          <p className="pb-3 text-6xl">{letter}</p>
        </Link>
      ))}
    </div>
  );
}
