import IconLink from "@/components/IconLink";
import { AppsIcon, VersionsIcon } from "@primer/octicons-react";

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[min(100dvw,72rem)] flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="my-2 text-lg">
          <em>practice</em>
        </h2>
        <div className="flex w-fit gap-1 rounded-lg border border-zinc-400 p-1">
          <IconLink
            href={"/practice"}
            icon={<VersionsIcon />}
            title="switch to practice"
          />
          <IconLink
            href={"/practice/grid"}
            icon={<AppsIcon />}
            title="switch to grid"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
