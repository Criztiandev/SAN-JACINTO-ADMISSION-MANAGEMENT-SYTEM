import { useEffect, useRef, useState } from "react";

const useCarousel = () => {
  const [carouselWidth, setCarouselWidth] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | undefined>(undefined);

  useEffect(() => {
    const scrollWidth = carouselRef.current?.scrollWidth || 0;
    const offsetWidth = carouselRef.current?.offsetWidth || 0;
    setCarouselWidth(scrollWidth - offsetWidth);

    return () => setCarouselWidth(0);
  }, []);

  return {
    carouselRef,
    carouselWidth,
  };
};

export default useCarousel;
