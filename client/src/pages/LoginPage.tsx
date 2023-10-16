import { Formik, Form } from "formik";
import { Input } from "../components";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="border w-full h-[100vh] grid grid-cols-[1fr_450px]">
      <div className="bg-backgroundImage bg-cover bg-no-repeat "></div>
      <div className="p-4 py-12">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(value, action) => {
            alert(value);
            console.log(value);
            action.resetForm();
          }}>
          <Form className="flex flex-col justify-between h-full">
            <h1 className="text-center uppercase font-bold">
              San Jancito National Highschool
            </h1>
            <div className="flex flex-col gap-4">
              <div>
                <Input type="email" label="Email" name="email" />
                <Input type="password" label="Password" name="password" />
              </div>

              <p className=" text-center w-full px-8">
                By signing up, you confirm that you have read and accepted our
                User notice and Privacy Policy
              </p>
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.8 }}
                className="p-[12px] px-8 border border-gray-400 rounded-full">
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
