import { AnimatePresence } from "framer-motion";
import { Button, Drawer, IconButton } from "../../components";
import { Form, Formik } from "formik";
import { EditIcon } from "../../assets/icons";

import { motion } from "framer-motion";

import { FetchingDrawerProps } from "../../interface/componentInterface";

const MessageDrawer = ({ data, state, onClose }: FetchingDrawerProps) => {
  return (
    <AnimatePresence mode="wait">
      <Drawer
        className="overflow-scroll"
        width="600px"
        state={state}
        onClick={onClose}>
        <Formik
          initialValues={{}}
          onSubmit={(values, action) => {
            // clean up
            alert(values);
            console.log(values);
            onClose();
            action.resetForm();
          }}>
          <Form className="grid grid-rows-[85px_1fr_48px] gap-4 h-full">
            <header className="pb-4 mb-4 border-b border-gray-400">
              <h3>Message</h3>
              <p>You can message the user with different categort</p>
            </header>
            <main className="h-full flex flex-col gap-4">
              <section className="flex justify-between items-center">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer bg-red-900 border border-gray-400 rounded-full py-[12px] px-4 w-full max-w-[150px] text-white text-center">
                  Facebook
                </motion.div>

                <div className="flex gap-4">
                  <div className="cursor-pointer border border-gray-400 rounded-full py-[12px] px-4">
                    Criztian Jade M Tuplano
                  </div>
                  <IconButton type="outlined" />
                </div>
              </section>

              {/* <Textarea  /> */}
              <textarea className="w-full h-full border p-4">
                Hey Criztian Jade M Tuplano. "I know you love her, but it's
                over, mate It doesn't matter, put the phone away It's never easy
                to walk away, let her goIt 'll be okayIt's gonna hurt for a bit
                of time. So bottoms up, let's forget tonight You'll find another
                and you'll be just fine Let her go"
              </textarea>
            </main>
            <footer className="flex justify-end items-center gap-4">
              <IconButton type="outlined" />
              <Button as="submit" title="Submit" dir="right" icon={EditIcon} />
            </footer>
          </Form>
        </Formik>
      </Drawer>
    </AnimatePresence>
  );
};

export default MessageDrawer;
