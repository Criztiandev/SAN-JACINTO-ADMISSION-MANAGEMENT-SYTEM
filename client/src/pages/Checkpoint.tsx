import { Formik, Form } from "formik";
import { Input, Typography } from "../components";
import { motion } from "framer-motion";
import useFormSubmit from "../hooks/useFormSubmit";
import { useSearchParams } from "react-router-dom";

const Checkpoint = () => {
  const [searchParams] = useSearchParams();
  const UID: string | null = searchParams.get("id");
  const token = searchParams.get("ver");

  const { handleSubmit } = useFormSubmit({
    route: "/auth/verify",
    redirect: "/",
  });

  const email = "c******@gmail.com";
  const expiration = "10:30 AM";
  return (
    <div className="h-[100vh] w-full bg-backgroundImage bg-cover flex justify-end">
      <div className="w-[40%] h-full bg-[#7a0021] text-white p-4 flex justify-center items-center px-12">
        <Formik
          initialValues={{ UID: UID, token: token }}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col justify-center gap-4 h-full">
            <div className="mb-4 flex gap-2 flex-col">
              <Typography as="h5">Email</Typography>
              <Typography as="h1" className="font-extrabold text-4xl">
                Account verification
              </Typography>
              <Typography as="small" className="italic">
                We just sent your authentication code via email to
                <span className="border-b"> {email}</span> The code will expire
                at <span className="border-b">{expiration}</span>
              </Typography>
            </div>

            <div>
              <Input
                label="Verfication Code"
                name="verification"
                placeholder="XXXXX"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm opacity-50 hover:opacity-100 hover:border-b">
                  Resend code ?
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.8 }}
                className="bg-white text-black font-bold p-[12px] px-8 rounded-lg w-full hover:bg-zinc-900 hover:text-white">
                Verify
              </motion.button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Checkpoint;