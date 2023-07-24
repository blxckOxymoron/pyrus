import LetterPractice from "./LetterPractice";

export default function Practice() {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");

  return (
    <>
      {letters.map((letter, i) => (
        <LetterPractice key={i} letter={letter} font="inter" />
      ))}
    </>
  );
}
