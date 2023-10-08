import useCarousel from "../hooks/useCarousel";
import { BaseProps } from "../interface/componentInterface";
import { motion } from "framer-motion";
import { RefObject } from "react";

const Carousel = ({ children }: BaseProps) => {
  const { carouselRef, carouselWidth } = useCarousel();
  return (
    <div
      ref={carouselRef as RefObject<HTMLDivElement>}
      className="carousel cursor-grab overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -carouselWidth }}
        className="inner-carousel flex gap-4 justify-between items-center">
        {children}
      </motion.div>
    </div>
  );
};

export default Carousel;
