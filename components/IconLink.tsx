import Link from "next/link";

export default function IconLink({
  icon,
  className,
  ...props
}: {
  icon: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={
        "rounded-md p-1 leading-0 transition-colors hover:bg-zinc-600 " +
        className
      }
      {...props}
    >
      {icon}
    </Link>
  );
}
