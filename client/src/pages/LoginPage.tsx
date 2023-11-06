import { Formik, Form, FormikHelpers } from "formik";
import { Input } from "../components";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
interface LoginCredentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const res = data;
      return res;
    },
    onError: (e) => {
      toast.error(e.message);
    },

    onSuccess: () => {
      toast.success("Login Successfully");
    },
  });

  const handleSubmit = async (
    value: LoginCredentials,
    action: FormikHelpers<LoginCredentials>
  ) => {
    await mutateAsync({ value });
    action.resetForm();
  };

  return (
    <div className="h-[100vh] w-full bg-backgroundImage bg-cover flex justify-end">
      <div className="w-[40%] h-full bg-[#7A0021] text-white p-4 flex justify-center items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}>
          <Form className="flex flex-col justify-center gap-4 h-full w-[400px] ali">
            <div className="mb-4">
              <span>Welcome to</span>
              <h1 className="uppercase font-bold">
                San Jancito National Highschool
              </h1>
              <small className="italic">
                "Basta Magaling sa San Jacinto Galing"
              </small>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                />
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>

              <Link className="items-end" to={"/forgot"}>
                Forgot Password
              </Link>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.8 }}
                className="bg-white text-black font-bold p-[12px] px-8 rounded-lg w-full hover:bg-zinc-900 hover:text-white">
                Login
              </motion.button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
