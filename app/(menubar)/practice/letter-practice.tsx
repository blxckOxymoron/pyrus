"use client";

import useDrawableCanvas from "./use-drawable-canvas";

export default function LetterPractice() {
  const { bindings } = useDrawableCanvas({
    width: 600,
    height: 600,
    strokeWidth: 15,
    onCompleted({ lines, data }) {
      console.log("completed", lines, data);
    },
  });

  return (
    <div className="rounded-lg border border-zinc-400">
      <canvas {...bindings}></canvas>;
    </div>
  );
}
