"use client";

import useDrawableCanvas from "./useDrawableCanvas";

import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TrashIcon } from "@primer/octicons-react";

export default function LetterPractice({
  letter,
  font,
  width = 70,
  height = 100,
  guides = [17, 30, 70, 85],
}: {
  letter: string;
  font: string;
  width?: number;
  height?: number;
  guides?: number[];
}) {
  const [savedImages, setSavedImages] = useLocalStorage<string[]>(
    ["practice", font, letter].join("/"),
    [],
  );

  //! TODO LIMIT SAVED IMAGES AND LOAD THEM DYNAMICALLY

  const { bindings } = useDrawableCanvas({
    width,
    height,
    strokeWidth: 8,
    onCompleted({ data }) {
      // TODO proper key with hash
      setSavedImages((savedImages) => [...savedImages, data]);
    },
  });

  return (
    <div className="relative flex max-w-full items-center gap-4">
      {guides.map((guide, i) => (
        <div
          key={i}
          className="pointer-events-none absolute w-full border-b-2 border-dotted border-zinc-400"
          style={{
            top: `${guide}%`,
            width,
          }}
        ></div>
      ))}
      <span
        className="pointer-events-none absolute pb-3 text-center text-7xl opacity-50"
        style={{ width }}
      >
        {letter}
      </span>
      <canvas
        {...bindings}
        className="flex-shrink-0 rounded-lg border border-zinc-400"
      ></canvas>

      <div className="flex flex-shrink flex-row gap-4 overflow-x-scroll rounded-lg">
        {savedImages
          .map((data, i) => (
            <div key={i} className="group relative flex-shrink-0">
              <Image
                src={data}
                alt={`image ${i}`}
                width={width}
                height={height}
                className="rounded-lg border border-zinc-400"
              />
              <button
                className="absolute right-2 top-2 h-max rounded-full leading-3 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() =>
                  setSavedImages((savedImages) =>
                    savedImages.filter((_, j) => j !== i),
                  )
                }
                title="delete"
              >
                <TrashIcon size={16} className="block" />
              </button>
            </div>
          ))
          .reverse()}
        {!savedImages.length && (
          <small className="text-zinc-400">
            written letters will show up here
          </small>
        )}
      </div>
    </div>
  );
}
