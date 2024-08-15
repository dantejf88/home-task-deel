import { useRef } from "react";

export const useDebounce = <T extends (...args: string[]) => void>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
