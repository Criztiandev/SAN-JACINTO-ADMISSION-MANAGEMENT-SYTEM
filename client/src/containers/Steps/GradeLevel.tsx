/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Radio, Typography } from "../../components";
import { cardSelection } from "../../animations/variants/selectionVariants";

interface yearLevelProps {
  cover: string;
  level: 7 | 8 | 9 | 10 | 11 | 12;
  desc: string;
}

const yearLevels: yearLevelProps[] = [
  { cover: "null", level: 7, desc: "Freshies" },
  { cover: "null", level: 8, desc: "Freshies" },
  { cover: "null", level: 9, desc: "Freshies" },
  { cover: "null", level: 10, desc: "Freshies" },
  { cover: "null", level: 11, desc: "Freshies" },
  { cover: "null", level: 12, desc: "Freshies" },
];

const GradeLevel = () => {
  const [cardSelect, setCardSelect] = useState<number>(-1);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carousel = useRef<HTMLDivElement | null>(null);
  const constrains = { right: 0, left: -carouselWidth };

  useEffect(() => {
    const scrollWidth: any = carousel.current?.scrollWidth || 0;
    const offsetWidth = carousel.current?.offsetWidth || 0;
    setCarouselWidth(scrollWidth - offsetWidth);

    return () => setCarouselWidth(0);
  }, []);

  return (
    <section className="flex justify-center items-center  h-full mb-4 overflow-hidden ">
      <motion.div
        ref={carousel}
        className="carousel cursor-grab overflow-hidden w-[700px]">
        <motion.div
          drag="x"
          dragConstraints={constrains}
          className="inner-carousel flex gap-4 ">
          {yearLevels.map(({ level, desc }, index) => (
            <motion.label
              key={level}
              animate={cardSelection.animate({ state: cardSelect, index })}
              variants={cardSelection.variant}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer min-w-[250px] min-h-[300px] rounded-[5px] flex justify-center items-center flex-col gap-4  shadow-xl border border-gray"
              onClick={() => setCardSelect(index)}>
              <div className="bg-blue-400 w-24 h-24 rounded-full"></div>
              <span className="text-center">
                <Typography as="h3">Grade {level}</Typography>
                <Typography as="small">{desc}</Typography>
              </span>
              <Radio
                className="hidden"
                name="studentDetails.yearLevel"
                value={`Grade ${level}`}
                id={`Grade ${level}`}
              />
            </motion.label>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GradeLevel;
