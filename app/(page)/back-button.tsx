"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@primer/octicons-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="inline-flex aspect-square items-center justify-center rounded-md font-semibold transition-colors hover:bg-gray-800"
    >
      <ChevronLeftIcon />
    </button>
  );
}
