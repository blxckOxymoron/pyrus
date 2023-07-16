"use client";

import { useEffect, useState } from "react";
import useDrawableCanvas from "./use-drawable-canvas";

import Image from "next/image";

export default function LetterPractice() {
  const [savedImages, setSavedImages] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("savedImages", JSON.stringify(savedImages));
  }, [savedImages]);

  useEffect(() => {
    setSavedImages(JSON.parse(localStorage.getItem("savedImages") ?? "[]"));
  }, []);

  //! TODO LIMIT SAVED IMAGES AND LOAD THEM DYNAMICALLY

  const { bindings } = useDrawableCanvas({
    width: 600,
    height: 600,
    strokeWidth: 8,
    onCompleted({ data }) {
      // TODO proper key with hash
      setSavedImages((savedImages) => [...savedImages, data]);
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-lg border border-zinc-400">
        <canvas {...bindings}></canvas>
      </div>
      <div className="flex max-w-6xl flex-wrap justify-center gap-4 ">
        {savedImages
          .map((data, i) => (
            <span key={i} className="group relative">
              <Image
                src={data}
                alt={`image ${i}`}
                width={300}
                height={300}
                className="rounded-lg border border-zinc-400"
              />
              <button
                className="absolute right-2 top-2 h-6 min-w-[1.5rem] rounded-full border border-red-500 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() =>
                  setSavedImages((savedImages) =>
                    savedImages.filter((_, j) => j !== i),
                  )
                }
                title="delete"
              >
                {i + 1}
              </button>
            </span>
          ))
          .reverse()}
      </div>
    </div>
  );
}
