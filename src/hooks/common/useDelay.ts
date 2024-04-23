import { useEffect, useState } from "react";

interface UseDelayReturn {
  isDelayFinished: boolean;
  resetDelay: () => void;
}

export function useDelay(delay: number): UseDelayReturn {
  const [isDelayFinished, setIsDelayFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayFinished(true);
    }, delay);

    // Clean timer if component is unmounted
    return () => clearTimeout(timer);
  }, [delay]);

  return { isDelayFinished, resetDelay: () => setIsDelayFinished(false) };
}
