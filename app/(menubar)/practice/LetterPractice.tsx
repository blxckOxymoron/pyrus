"use client";

import useDrawableCanvas from "./useDrawableCanvas";

import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TrashIcon } from "@primer/octicons-react";
import { useRef, useState } from "react";
import { animationDuration, canvasHeight, canvasWidth } from "./constants";

export default function LetterPractice({
  letter,
  font,
  width = canvasWidth, // to allow for multiple letters to get wider canvas
  height = canvasHeight,
  guides = [17, 30, 70, 85],
}: {
  letter: string;
  font: string;
  width?: number;
  height?: number;
  guides?: number[];
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const [savedImages, setSavedImages] = useLocalStorage<
    {
      id: string;
      data: string;
    }[]
  >(["practice", font, letter].join("/"), []);

  //! TODO LIMIT SAVED IMAGES AND LOAD THEM DYNAMICALLY

  const { bindings, clear: clearCanvas } = useDrawableCanvas({
    width,
    height,
    strokeWidth: 8,
    onCompleted({ data }) {
      const id = Date.now().toString(36);
      setIsAnimating(true);
      letterRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        setSavedImages((savedImages) => [...savedImages, { data, id }]);
        clearCanvas();
        setIsAnimating(false);
      }, animationDuration);
    },
  });

  return (
    <div
      className="group/practice relative flex max-w-full -translate-x-3 items-center gap-4 overflow-hidden rounded-lg pl-3"
      data-animating={isAnimating ? "" : undefined}
      style={
        {
          "--w": width + "px",
          "--h": height + "px",
          "--duration": animationDuration + "ms",
        } as any
      }
      id={"letter-" + letter}
    >
      <div className="pointer-events-none absolute h-var w-var opacity-100 transition-opacity group-[[data-animating]]/practice:opacity-0">
        {guides.map((guide, i) => (
          <div
            key={i}
            className="absolute w-var border-b-2 border-dotted border-zinc-400"
            style={{
              top: `${guide}%`,
            }}
          ></div>
        ))}
        <span className="absolute top-1/2 w-var -translate-y-1/2 pb-3 text-center text-7xl opacity-50">
          {letter}
        </span>
      </div>

      <span className="absolute left-3 -z-10 h-var w-var origin-left scale-50 transform rounded-lg border border-zinc-400 transition-transform duration-var group-[[data-animating]]/practice:scale-100" />

      <canvas
        {...bindings}
        className="flex-shrink-0 rounded-lg border border-zinc-400 bg-black transition-transform duration-0 group-[[data-animating]]/practice:translate-x-[calc(100%+16px)] group-[[data-animating]]/practice:duration-var"
      ></canvas>

      <div
        className="transition-transfom flex flex-shrink snap-x flex-row gap-4 overflow-x-scroll rounded-lg duration-0 group-[[data-animating]]/practice:translate-x-[calc(var(--w)+16px)] group-[[data-animating]]/practice:duration-var"
        ref={letterRef}
      >
        {savedImages
          .map((img) => (
            <div
              key={img.id}
              className="group relative flex-shrink-0 snap-start"
            >
              <Image
                src={img.data}
                alt={`image ${img.id}`}
                width={width}
                height={height}
                className="rounded-lg border border-zinc-400"
              />
              <button
                className="absolute right-2 top-2 h-max rounded-full leading-3 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() =>
                  setSavedImages((savedImages) =>
                    savedImages.filter((i) => i.id !== img.id),
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
          <small className="text-zinc-400 opacity-100 transition-opacity duration-var group-[[data-animating]]/practice:opacity-0">
            written letters will show up here
          </small>
        )}
      </div>
    </div>
  );
}
