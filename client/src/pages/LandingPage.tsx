import { useState, useEffect } from "react";

import HeroSection from "../containers/LandingPage/HeroSection";
import StatsSection from "../containers/LandingPage/StatsSection";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Acitvity_1 from "../assets/image/activities/activity_1.jpg";
import Activity_2 from "../assets/image/activities/activity_2.jpg";
import Activity_3 from "../assets/image/activities/activity_3.jpg";
import Academic from "../assets/image/activities/academic.jpg";
import Arts_1 from "../assets/image/activities/Arts_1.jpg";

import lifeAtSJNJS_2 from "../assets/image/activities/life_at_SJNHS 2.jpg";

import SideNav from "../containers/LandingPage/SideNav";
import HeaderNav from "../containers/LandingPage/HeaderNav";

import Image from "../components/Image";
interface CardContentProps {
  cover: string;
  title: string;
  desc: string;
}

interface SchoolStatsProps {
  title: string;
  count: number;
}

const cardContent: CardContentProps[] = [
  {
    cover: Acitvity_1,
    title: "Exploring Excellence at SJNHS",
    desc: "At San Juan National High School (SJNHS), excellence is our cornerstone. We're dedicated to providing a top-tier education with a rich history of academic achievements, innovative programs, and a supportive community. From academic excellence to vibrant extracurriculars, SJNHS invites you to explore what makes us exceptional. Join us on a journey where academics and personal growth converge, empowering every student to shine.",
  },

  {
    cover: Activity_2,
    title: "Unlock your potential at SJNHS",
    desc: "at SJNHS, we  believe in creating a vibrant learning environment where student can thrive. Our enjoyable approach to knowledge encourages curiosity, creativity, and critical thinking. With dedicated teachers, state of the art facilities and supportive community, we empower students to  unlock their full potentials and achieve academic excellence",
  },

  {
    cover: Activity_3,
    title: "Life at SJNHS",
    desc: "at SJNHS, we  believe in creating a vibrant learning environment where student can thrive. Our enjoyable approach to knowledge encourages curiosity, creativity, and critical thinking. With dedicated teachers, state of the art facilities and supportive community, we empower students to  unlock their full potentials and achieve academic excellence",
  },
];

const cardStepper: CardContentProps[] = [
  {
    cover: Academic,
    title: "Academic Achievement and Awards",
    desc: "SJNHS has been recognized for its exceptional academic performance, receiving numerous awards and accoldes",
  },

  {
    cover: Acitvity_1,
    title: "Excellence in Sports",
    desc: "In addition to academic success, SJNHS has a strong sports program, with students achieving victories in various competition",
  },
  {
    cover: Arts_1,
    title: "Arts and Culture Recognition",
    desc: "SJNHS students excels in the arts and culture scene, receiving recognition for their talents in music, dance, and theater",
  },
];

const schoolStats: SchoolStatsProps[] = [
  { title: "Students", count: 15000 },
  { title: "Faculty", count: 18 },
  { title: "Alumni", count: 3000 },
];

const LandingPage = () => {
  const [isThrottled, setIsThrottled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);

  const handleToggle = () => setToggle((prev) => !prev);

  const handleMaintenance = () => {
    if (!isThrottled) {
      toast.error("This is Underconstruction, Please Try again Later");
      setIsThrottled(true);
    }
  };

  useEffect(() => {
    if (isThrottled) {
      // Reset the throttled state after a delay (e.g., 5 seconds)
      const timeoutId = setTimeout(() => {
        setIsThrottled(false);
      }, 5000);

      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [isThrottled]);

  return (
    <>
      <header className="flex fixed justify-between items-cente w-full p-4">
        <HeaderNav state={toggle} onClick={handleToggle} />
        <SideNav state={toggle} onClick={handleToggle} />
      </header>

      <main className="">
        <HeroSection />

        <div className="flex flex-col gap-[150px]">
          <StatsSection stats={schoolStats} />

          <section className="px-[64px] flex flex-col gap-[150px]">
            {cardContent.map((item, index) => (
              <div
                key={item.title}
                className="grid grid-cols-2 gap-[64px] items-center justify-center select-none">
                <div className={`${index % 2 === 0 && "order-last"}`}>
                  <h2 className="font-secondary border-b border-gray-400 pb-2">
                    {item.title}
                  </h2>
                  <p className="my-8">{item.desc}</p>

                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className={`text-lg select-none cursor-pointer font-secondary hover:border-b hover:border-gray-400 ${
                      isThrottled && "text-gray-400"
                    }`}
                    onClick={handleMaintenance}>
                    Learn more about our school
                  </motion.span>
                </div>

                <div className="w-full  overflow-hidden rounded-[5px] border">
                  <Image src={item.cover} alt="cover" />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-[64px] items-center">
              <div className={`details flex flex-col gap-[24px] order-last`}>
                {cardStepper.map((item, index) => (
                  <div
                    key={item.title}
                    className={`cursor-pointer ${
                      selectedCard === index
                        ? "border-l-2 border-black"
                        : "opacity-50"
                    } py-2 px-4`}
                    onClick={() => setSelectedCard(index)}>
                    <h3 className="font-secondary">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="w-full h-[400px] overflow-hidden rounded-[5px]">
                <img
                  src={cardStepper[0].cover}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </section>

          <section className="px-[64px]">
            <div className="grid grid-cols-2 gap-[64px] items-center">
              <div className={`details flex flex-col gap-[24px] `}>
                <h2 className="font-secondary border-b border-gray-400 pb-2">
                  Life At SJNHS
                </h2>
                <p className="my-4">
                  at SJNHS, we believe in creating a vibrant learning
                  environment where student can thrive. Our enjoyable approach
                  to knowledge encourages curiosity, creativity, and critical
                  thinking. With dedicated teachers, state of the art facilities
                  and supportive community, we empower students to unlock their
                  full potentials and achieve academic excellence
                </p>

                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className={`text-lg select-none cursor-pointer font-secondary hover:border-b hover:border-gray-400 ${
                    isThrottled && "text-gray-400"
                  }`}
                  onClick={handleMaintenance}>
                  Learn more about our school
                </motion.span>
              </div>

              <div className=" w-full border  rounded-[5px]">
                <Image src={lifeAtSJNJS_2} alt="life" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#252525] h-[300px] flex justify-center items-center flex-col text-white mt-16">
        <h1 className=" font-secondary text-[64px] text-white">
          Under Construction
        </h1>
        <span className="text-[24px]">We wil fix this soon</span>
      </footer>
    </>
  );
};

export default LandingPage;
