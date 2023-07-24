"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@primer/octicons-react";
import IconButton from "@/components/IconButton";

export default function BackButton() {
  const router = useRouter();

  return <IconButton icon={<ChevronLeftIcon />} onClick={router.back} />;
}
