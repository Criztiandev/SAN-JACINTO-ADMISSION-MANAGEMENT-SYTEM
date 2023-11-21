import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { InputProps } from "../interface/FormInterface";
import { authSchema } from "../schema/authSchema";
import useFormSubmit from "../hooks/useFormSubmit";
import Input from "../components/Input";
import Typography from "../components/Typography";

const LoginInput: InputProps[] = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter your password",
  },
];

const LoginPage = () => {
  const { handleSubmit, isPending, isThrottled } = useFormSubmit({
    route: "/auth/login",
  });

  return (
    <div className="h-[100vh] w-full bg-backgroundImage bg-cover flex justify-end">
      <div className="w-[40%] h-full bg-[#1e1e1e] text-white p-4 flex justify-center items-center px-12">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={authSchema}>
          <Form className="flex flex-col justify-center gap-4 h-full">
            <div className="mb-4 flex gap-2 flex-col">
              <Typography as="h5">Welcome to</Typography>
              <Typography as="h1" className="font-extrabold text-4xl">
                San Jacinto National HighSchool
              </Typography>
              <Typography as="small" className="italic">
                Basta Magaling sa San Jacinto Galing
              </Typography>
            </div>

            <div className="flex flex-col gap-4">
              {LoginInput.map((props) => (
                <Input
                  key={props.label}
                  {...props}
                  className="border border-gray-400"
                  color="text-white"
                />
              ))}

              <div className="flex justify-end"></div>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: isPending ? 1 : 0.8 }}
                className={`bg-white text-black font-bold p-[12px] px-8 rounded-lg w-full hover:bg-[#7a0021] hover:text-white ${
                  isPending || (isThrottled && "bg-gray-400 hover:bg-gray-400")
                }`}
                disabled={isPending || isThrottled}>
                {isPending ? "Loging in...." : "Login"}
              </motion.button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
