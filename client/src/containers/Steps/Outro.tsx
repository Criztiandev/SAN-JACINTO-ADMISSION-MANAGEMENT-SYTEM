import { motion } from "framer-motion";
import Carousel from "../../components/Carousel";
import { Typography } from "../../components";

const Outro = () => {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Carousel width={500}>
          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16 shadow-xl">
            <p className="text-center text-lg">
              " We are thrilled to welcome you to our school community! Your
              admission has been confirmed, and we've got some exciting news to
              share.""
            </p>
          </div>

          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16">
            <p className="text-center text-lg">
              📅 Your examination schedule is now available and will be sent
              directly to your Gmail or Facebook account. Make sure to keep an
              eye on your inbox for important updates and details.
            </p>
          </div>

          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16">
            <p className="text-center text-lg">
              🚀 Get ready for an incredible journey ahead! Your registered
              Facebook account will be your primary source for all the latest
              school news, events, and announcements. Connect with us there to
              stay in the loop.
            </p>
          </div>

          <div className="min-w-[500px] h-[300px] flex items-center justify-center flex-col gap-4 border rounded-[5px] p-4 bg-white px-16">
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

<div className="flex flex-col gap-4 max-w-[600px]">
  <p>
    We are thrilled to welcome you to our school community! Your admission has
    been confirmed, and we've got some exciting news to share.
  </p>
  <motion.p whileHover={{ scale: 1.1 }} className="cursor-pointer ">
    📅 Your
    <span className="bg-yellow-200 px-2">examination schedule</span> is now
    available and will be{" "}
    <span className="bg-yellow-200 px-2">
      sent directly to your Gmail or Facebook account.
    </span>
    Make sure to keep an eye on your inbox for important updates and details.
  </motion.p>
  <motion.p whileHover={{ scale: 1.1 }} className="cursor-default">
    🚀 Get ready for an incredible journey ahead! Your registered Facebook
    account will be your primary source for all the latest school news, events,
    and announcements. Connect with us there to stay in the loop.
  </motion.p>
  <motion.p whileHover={{ scale: 1.1 }} className="cursor-default">
    📚 Your education adventure begins now, and we can't wait to see all the
    amazing things you'll accomplish. If you have any questions or need
    assistance, feel free to reach out. Let's make this journey unforgettable!
  </motion.p>
</div>;

export default Outro;
