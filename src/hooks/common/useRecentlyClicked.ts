"use client";
import { useEffect, useRef, useState } from "react";

type RefType = HTMLButtonElement | null;
export const ONE_SECOND = 1000; // ms
export const TWO_SECONDS = 2500; // ms

export function useRecentlyClicked(waitTime = ONE_SECOND) {
  const [clicked, setClicked] = useState(false);
  const ref = useRef<RefType>(null);

  useEffect(() => {
    if (!ref.current) return;

    function handleClick() {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, waitTime);

      ref.current?.click();
    }

    ref.current.addEventListener("click", handleClick);

    // avoid losing the pointer when clean up
    const copyCurrentButton = ref.current;
    return () => {
      copyCurrentButton.removeEventListener("click", handleClick);
    };
  }, [ref, waitTime]);

  return { ref, recentlyClicked: clicked };
}
