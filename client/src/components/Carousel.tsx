import ItemSelect from "../containers/Form/ItemSelect";
import useCarousel from "../hooks/useCarousel";
import { BaseProps } from "../interface/Common.Types";
import { motion } from "framer-motion";
import { RefObject } from "react";

interface CarouselProps extends BaseProps {
  width?: number | string;
  direction?: "center" | "left";
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

Carousel.Item = ItemSelect;

export default Carousel;
