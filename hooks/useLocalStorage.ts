import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [stored, setStored] = useState<T>(initialValue);

  useEffect(() => {
    const fromStorage = localStorage.getItem(key);
    setStored(fromStorage ? JSON.parse(fromStorage) : initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(stored));
  }, [key, stored]);

  return [stored, setStored];
}
