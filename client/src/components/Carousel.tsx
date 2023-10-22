import useCarousel from "../hooks/useCarousel";
import { BaseProps } from "../interface/Component.type";
import { motion } from "framer-motion";
import { RefObject } from "react";

interface CarouselProps extends BaseProps {
  width?: number | string;
  direction?: "center";
}

const Carousel = ({ width = "700px", children, direction }: CarouselProps) => {
  const { carouselRef, carouselWidth } = useCarousel();
  return (
    <div
      ref={carouselRef as RefObject<HTMLDivElement>}
      className="carousel cursor-grab overflow-hidden"
      style={{ width: width }}>
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -carouselWidth }}
        className={`inner-carousel flex gap-4 ${
          direction === "center" ? "justify-center" : "justify-between"
        } items-center`}>
        {children}
      </motion.div>
    </div>
  );
};

export default Carousel;
