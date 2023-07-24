export default function IconButton({
  icon,
  className,
  ...props
}: {
  icon: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">) {
  return (
    <button
      className={
        "rounded-md p-1 leading-0 transition-colors hover:bg-zinc-600 " +
        className
      }
      {...props}
    >
      {icon}
    </button>
  );
}
