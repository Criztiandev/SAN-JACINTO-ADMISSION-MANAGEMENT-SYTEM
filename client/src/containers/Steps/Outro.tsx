import { motion } from "framer-motion";
import Carousel from "../../components/Carousel";
import { Typography } from "../../components";

const Outro = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Carousel>
          <motion.div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16 shadow-xl">
            <div className="w-[84px] h-[84px] border border-black rounded-full"></div>
            <p className="text-center text-lg">
              " We are thrilled to welcome you to our school community! Your
              admission has been confirmed, and we've got some exciting news to
              share."
            </p>
          </motion.div>

          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16">
            <div className="w-[84px] h-[84px] border border-black rounded-full"></div>
            <p className="text-center text-lg">
              📅{" "}
              <span className="bg-orange-300">
                Your examination schedule will be sent directly to your
                registered Gmail or Facebook account
              </span>
              . Make sure to keep an eye on your inbox for important updates and
              details.
            </p>
          </div>

          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16">
            <div className="w-[84px] h-[84px] border border-black rounded-full"></div>
            <p className="text-center text-lg">
              🚀 Get ready for an incredible journey ahead!{" "}
              <span className="bg-orange-300">
                Your registered Facebook account will be your primary source for
                all the latest school news, events, and announcements.
              </span>{" "}
              Connect with us there to stay in the loop.
            </p>
          </div>

          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16">
            <div className="w-[84px] h-[84px] border border-black rounded-full"></div>
            <p className="text-lg text-center flex flex-col gap-2">
              📚 Your education adventure begins now, and we can't wait to see
              all the amazing things you'll accomplish. If you have any
              questions or need assistance, feel free to reach out. Let's make
              this journey unforgettable!
            </p>
          </div>
        </Carousel>

        <Typography as="span" className="text-gray-400 pb-2 mt-4">
          Read the Cards, Just swipe
        </Typography>
      </div>
    </div>
  );
};

export default Outro;
