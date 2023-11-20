import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import useFormSubmit from "../hooks/useFormSubmit";
import Typography from "../components/Typography";
import useURL from "../hooks/useURL";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Checkpoint = () => {
  const { login } = useAuthContext();
  const { queryParams, redirect } = useURL();
  const UID = queryParams.get("id");
  const token = queryParams.get("ver");

  const { handleSubmit, isPending } = useFormSubmit({
    route: "/auth/verify",
    overideFn: () => {
      login(UID || "");
    },
    redirect: "/",
  });

  if (!UID || !token) {
    toast.error("Invalid Route, Please Try again later");
    redirect("/");
    return;
  }

  return (
    <div className="h-[100vh] w-full bg-backgroundImage bg-cover flex justify-end">
      <div className="w-[40%] h-full bg-[#1e1e1e] text-white p-4 flex justify-center items-center px-12">
        <Formik
          initialValues={{ UID: UID, token: token }}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col justify-center gap-4 h-full">
            <div className="mb-4 flex gap-2 flex-col">
              <Typography as="h5" className="italic">
                SJNHS
              </Typography>
              <Typography as="h1" className="font-extrabold text-4xl">
                Account verification
              </Typography>
              <Typography as="small" className="">
                Thank you for verifying your SJNHS account! We appreciate your
                commitment to account security. For any questions or assistance,
                contact our support team at
                <br /> <br />
                📨 sanjacintonationalhighschool@gmail.com.
              </Typography>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.8 }}
                className="bg-white text-black font-bold p-[12px] px-8 rounded-lg w-full hover:bg-[#7a0021] hover:text-white"
                disabled={isPending}>
                {isPending ? "Verifying..." : "Verify"}
              </motion.button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Checkpoint;
