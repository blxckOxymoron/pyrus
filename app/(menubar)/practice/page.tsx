import LetterPractice from "./LetterPractice";

export default function Practice() {
  return (
    <div className="flex w-[min(100dvw,72rem)] flex-col gap-4 p-4">
      <em>practice</em>
      {Array.from({ length: 26 }, (_, i) => (
        <LetterPractice
          key={i}
          letter={String.fromCharCode(97 + i)}
          font="inter"
        />
      ))}
    </div>
  );
}
