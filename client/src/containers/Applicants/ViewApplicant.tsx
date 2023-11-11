import { Formik, Form, Field } from "formik";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import { useState } from "react";
import { IconButton, Carousel, Button } from "../../components";
import { EditIcon } from "../../assets/icons";
import { ApplicationFormInputModel } from "../../data/Stepper.Data";
import InputSections from "../Form/InputSections";
import ItemSelect from "../Form/ItemSelect";
import { yearLevelItem } from "../../data/Stepper.Data";
import useFormSubmit from "../../hooks/useFormSubmit";

const ViewApplicant = ({ APID }: { APID: string }) => {
  const [selectedYearLevel, setSelectedYearLevel] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);

  // Fetching
  const { data, isLoading, isPending } = useFetch({
    route: `/applicant/${APID}`,
    key: ["applicant"],
  });

  // mutation
  const { handleSubmit, isPending: mutationPending } = useFormSubmit({
    route: "test",
    type: "post",
  });

  if (isLoading || isPending) return <FetchLoader />;
  const { personalDetails, studentDetails } = data;

  const handleReset = () => {
    setIsEdit(false);
  };

  return (
    <Formik
      initialValues={{
        fullName: `${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleName} ${personalDetails.suffix}`,
        ...data,
      }}
      onSubmit={handleSubmit}>
      <Form>
        <header className="flex justify-between items-center border-b border-gray-400 pb-2 mb-4">
          <div className="flex flex-col">
            {isEdit ? (
              <Field
                name="fullName"
                className="border-b border-gray-400 text-black px-2 text-[30px] font-bold"
              />
            ) : (
              <h2 className="font-bold">
                {personalDetails.lastName}, {personalDetails.firstName}{" "}
                {personalDetails.middleName[0]}. {personalDetails.suffix}
              </h2>
            )}
            {isEdit ? (
              <Field
                name="personalDetails.email"
                className=" my-2 px-2 border-b border-gray-500 text-black"
              />
            ) : (
              <span className="text-gray-400 my-2">
                @{personalDetails?.email.split("@")[0]}
              </span>
            )}
          </div>

          <IconButton
            as="outlined"
            icon={EditIcon}
            onClick={() => setIsEdit((prev) => !prev)}
            className={`p-2 border border-gray-400 rounded-full  ${
              isEdit ? "border-green-500 bg-[#22f86275]" : ""
            }`}
          />
        </header>

        <main>
          <section className="flex flex-col gap-2 justify-start items-start mb-4">
            <h4>Grade Level</h4>
            <div className={`${!isEdit && "opacity-50"}`}>
              {/* // Remember this shit */}
              <Carousel width={"550px"}>
                {yearLevelItem.map((props) => (
                  <ItemSelect
                    key={props.title}
                    select={
                      isEdit ? selectedYearLevel : studentDetails.yearLevel
                    }
                    onSelect={isEdit ? setSelectedYearLevel : () => {}}
                    {...props}
                    name="studentDetails.yearLevel"
                  />
                ))}
              </Carousel>
            </div>
          </section>
          {ApplicationFormInputModel.map((props) => (
            <InputSections key={props.title} {...props} isEdit={!isEdit} />
          ))}
        </main>

        {isEdit && (
          <footer className="flex gap-4 justify-end">
            <IconButton as="outlined" type="button" onClick={handleReset} />
            <Button
              type="submit"
              as="contained"
              title="Submit"
              disabled={mutationPending}
            />
          </footer>
        )}
      </Form>
    </Formik>
  );
};

export default ViewApplicant;
