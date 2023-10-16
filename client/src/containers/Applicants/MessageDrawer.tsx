import { AnimatePresence } from "framer-motion";
import { Button, Drawer, Dropdown, IconButton } from "../../components";
import { Form, Formik } from "formik";
import { EditIcon } from "../../assets/icons";

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
                <Dropdown>
                  <Button title="Facebook" />
                </Dropdown>

                <div className="flex gap-4">
                  <div>Criztian Jade M Tuplano</div>
                  <IconButton />
                </div>
              </section>

              {/* <Textarea  /> */}
              <textarea className="w-full border">
                Hey Criztian Jade M Tuplano. "I know you love her, but it's
                over, mate It doesn't matter, put the phone away It's never easy
                to walk away, let her goIt 'll be okayIt's gonna hurt for a bit
                of time. So bottoms up, let's forget tonight You'll find another
                and you'll be just fine Let her go"
              </textarea>
            </main>
            <footer className="flex justify-end items-center gap-4">
              <IconButton />
              <Button as="submit" title="Submit" dir="right" icon={EditIcon} />
            </footer>
          </Form>
        </Formik>
      </Drawer>
    </AnimatePresence>
  );
};

export default MessageDrawer;
