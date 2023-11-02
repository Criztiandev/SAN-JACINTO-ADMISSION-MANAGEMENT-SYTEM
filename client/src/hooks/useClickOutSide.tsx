/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";

const useClickOutSide = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<any>(null);

  const handleClickOutSide = (event: MouseEvent) => {
    const current = ref.current;
    if (current && !current.contains(event.target as Node)) setActive(false);
  };

  const handleActive = () => setActive((prev) => !prev);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return { active, ref, handleActive };
};

export default useClickOutSide;
