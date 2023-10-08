import { useState } from "react";
import { IconButton } from "../components";
import ArrowLeft from "../assets/icons/Expand_left_light.svg";
import ArrowRight from "../assets/icons/Expand_right_light.svg";

interface CardContentProps {
  title: string;
  desc: string;
}

interface SchoolStatsProps {
  title: string;
  count: number;
}

interface AlumniDetailsProps {
  avatar: string;
  name: string;
  role: string;
}

const cardContent: CardContentProps[] = [
  {
    title: "Exploring Excellence at SJNHS",
    desc: "At San Juan National High School (SJNHS), excellence is our cornerstone. We're dedicated to providing a top-tier education with a rich history of academic achievements, innovative programs, and a supportive community. From academic excellence to vibrant extracurriculars, SJNHS invites you to explore what makes us exceptional. Join us on a journey where academics and personal growth converge, empowering every student to shine.",
  },

  {
    title: "Unlock your potential at SJNHS",
    desc: "at SJNHS, we  believe in creating a vibrant learning environment where student can thrive. Our enjoyable approach to knowledge encourages curiosity, creativity, and critical thinking. With dedicated teachers, state of the art facilities and supportive community, we empower students to  unlock their full potentials and achieve academic excellence",
  },

  {
    title: "Life at SJNHS",
    desc: "at SJNHS, we  believe in creating a vibrant learning environment where student can thrive. Our enjoyable approach to knowledge encourages curiosity, creativity, and critical thinking. With dedicated teachers, state of the art facilities and supportive community, we empower students to  unlock their full potentials and achieve academic excellence",
  },
];

const cardStepper: CardContentProps[] = [
  {
    title: "Academic Achievement and Awards",
    desc: "SJNHS has been recognized for its exceptional academic performance, receiving numerous awards and accoldes",
  },

  {
    title: "Excellence in Sports",
    desc: "In addition to academic success, SJNHS has a strong sports program, with students achieving victories in various competition",
  },
  {
    title: "Arts and Culture Recognition",
    desc: "SJNHS students excels in the arts and culture scene, receiving recognition for their talents in music, dance, and theater",
  },
];

const schoolStats: SchoolStatsProps[] = [
  { title: "Students", count: 15000 },
  { title: "Faculty", count: 18 },
  { title: "Alumni", count: 3000 },
];

const Testimonial = [
  {
    testimonial:
      "“ at SJNHS, we  believe in creating a vibrant learning environment where student can thrive. Our enjoyable approach to knowledge encourages curiosity, creativity, and critical thinking. With dedicated teachers, state of the art facilities and supportive community, we empower students to  unlock their full potentials and achieve academic excellence ",
    author: {
      profile: "",
      name: "Criztian Jade M Tuplano",
      role: "student",
    },
  },

  {
    testimonial:
      "“ Tite at SJNHS, we  believe in creating a vibrant learning environment where student can thrive. Our enjoyable approach to knowledge encourages curiosity, creativity, and critical thinking. With dedicated teachers, state of the art facilities and supportive community, we empower students to  unlock their full potentials and achieve academic excellence ",
    author: {
      profile: "",
      name: "Criztian Jade M Tuplano",
      role: "student",
    },
  },
];

const alumniDetails: AlumniDetailsProps[] = [
  {
    avatar: "avatar1.jpg",
    name: "Criztian Jade M Tuplano",
    role: "Student",
  },
  {
    avatar: "avatar2.jpg",
    name: "Mark Jayson Alves",
    role: "BSCS 3E",
  },
  {
    avatar: "avatar3.jpg",
    name: "Anna Smith",
    role: "BSCS 2D",
  },
  {
    avatar: "avatar4.jpg",
    name: "John Doe",
    role: "BSCS 4A",
  },
  {
    avatar: "avatar5.jpg",
    name: "Emily Johnson",
    role: "Student",
  },
  {
    avatar: "avatar6.jpg",
    name: "Michael Brown",
    role: "BSCS 3C",
  },
  {
    avatar: "avatar7.jpg",
    name: "Sara Davis",
    role: "BSCS 2B",
  },
  {
    avatar: "avatar8.jpg",
    name: "Robert Clark",
    role: "Student",
  },
  {
    avatar: "avatar9.jpg",
    name: "Sophia Garcia",
    role: "BSCS 4D",
  },
  {
    avatar: "avatar10.jpg",
    name: "Daniel White",
    role: "BSCS 3A",
  },
];

const LandingPage = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const handlePrev = () => {
    setSelectedTestimonial(prev => (prev <= 0 ? prev : prev - 1));
  };

  const handleNext = () => {
    setSelectedTestimonial(prev =>
      prev >= Testimonial.length - 1 ? prev : prev + 1
    );
  };

  return (
    <>
      <header className="flex fixed justify-between items-center border border-black w-full p-4">
        <span>logo</span>

        <IconButton type="ghost" />
      </header>

      <main className="">
        <section className="h-[100vh] flex justify-center items-center gap-4 flex-col border border-black">
          <h1 className="text-[84px] text-center font-bold">
            San Jacinto National Highschool
          </h1>
          <p className="w-[700px] text-center border">
            Where world-class professors, innovative research, and a dynamic
            student community come together to advance education and foster
            change in the world.
          </p>
        </section>

        <div className="flex flex-col gap-[150px]">
          <section className="flex justify-center items-center gap-32 border border-black p-4">
            {schoolStats.map(stats => (
              <div
                key={stats.title}
                className="flex justify-center items-center flex-col">
                <h3>{stats.count}</h3>
                <span>{stats.title}</span>
              </div>
            ))}
          </section>

          <section className="px-[64px] flex flex-col gap-[150px]">
            {cardContent.map((item, index) => (
              <div
                key={item.title}
                className="grid grid-cols-2 gap-[64px] items-center">
                <div
                  className={`details flex flex-col gap-[24px] ${
                    index % 2 === 0 && "order-last"
                  }`}>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>

                  <span>Learn more about our school </span>
                </div>

                <div className=" w-full h-[400px] border border-black rounded-[5px]"></div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-[64px] items-center">
              <div className={`details flex flex-col gap-[24px] order-last`}>
                {cardStepper.map((items, index) => (
                  <div
                    key={items.title}
                    className={`cursor-pointer ${
                      selectedCard === index
                        ? "border-l-2 border-black"
                        : "opacity-50"
                    } py-2 px-4`}
                    onClick={() => setSelectedCard(index)}>
                    <h3>{items.title}</h3>
                    <p className="text-gray-500">{items.desc}</p>
                  </div>
                ))}
              </div>

              <div className=" w-full h-[400px] border border-black rounded-[5px]"></div>
            </div>
          </section>

          <section className="bg-[#F5F5F5] flex items-center flex-col px-[64px] py-[45px]">
            <div className="flex justify-between items-center w-full px-[64px]">
              <IconButton
                icon={ArrowLeft}
                type="contained"
                onClick={handlePrev}
              />
              <div className="w-[600px] text-center flex flex-col gap-4">
                <div>
                  <h2 className="mb-4">Testimonial</h2>
                  <p>“ {Testimonial[selectedTestimonial].testimonial} “</p>
                </div>

                <div className="flex flex-col justify-center items-center my-4">
                  <div className="w-16 h-16 border border-black rounded-full mb-4"></div>
                  <span>{Testimonial[selectedTestimonial].author.name}</span>
                  <small>{Testimonial[selectedTestimonial].author.role}</small>
                </div>
              </div>
              <IconButton
                icon={ArrowRight}
                type="contained"
                onClick={handleNext}
              />
            </div>
          </section>

          <section className="px-[64px]">
            <div className="grid grid-cols-2 gap-[64px] items-center">
              <div className={`details flex flex-col gap-[24px] `}>
                <h2>Life at SJNHS</h2>
                <p>
                  at SJNHS, we believe in creating a vibrant learning
                  environment where student can thrive. Our enjoyable approach
                  to knowledge encourages curiosity, creativity, and critical
                  thinking. With dedicated teachers, state of the art facilities
                  and supportive community, we empower students to unlock their
                  full potentials and achieve academic excellence
                </p>

                <span>Learn more about our school </span>
              </div>

              <div className=" w-full h-[400px] border border-black rounded-[5px]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 border border-black h-[400px] mt-[150px]">
              <div className="grid grid-rows-2 gap-4 border">
                <div className="w-full bg-gray-400 rounded-[5px]"> hi</div>
                <div className="flex gap-4">
                  <div className="bg-gray-400 w-full rounded-[5px]"></div>
                  <div className="bg-gray-400 w-full rounded-[5px]"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-400">hi</div>
                <div className="flex flex-col gap-4">
                  <div className="bg-gray-400 w-full h-full rounded-[5px]">
                    hi
                  </div>
                  <div className="bg-gray-400 w-full h-full rounded-[5px]">
                    hi
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-[64px] flex justify-center items-center flex-col">
            <div className="text-center max-w-[700px]">
              <h2 className="mb-4">Our Alumni</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quibusdam officiis laudantium illum libero, quis unde voluptatum
                labore, quas, at iure esse culpa earum exercitationem adipisci
                voluptate dicta et iusto minus!
              </p>
            </div>

            <div className="grid grid-cols-5 gap-12 my-16">
              {alumniDetails.map(alumni => (
                <div className="flex justify-center items-center flex-col gap-2 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-400"></div>
                  <h6>{alumni.name}</h6>
                  <small>{alumni.role}</small>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#252525] h-[300px]">hi</footer>
    </>
  );
};

export default LandingPage;
