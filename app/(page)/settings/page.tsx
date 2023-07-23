"use client";

export default function Settings() {
  return (
    <div className="flex flex-col items-center gap-2">
      <em>settings</em>
      <button
        onClick={() =>
          confirm("this will remove all images") && localStorage.clear()
        }
        className="rounded-md border border-zinc-400 px-2"
      >
        clear localstorage
      </button>
    </div>
  );
}
