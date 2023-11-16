/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "../../components/Typography";
import Avatar from "../../components/Avatar";
import { FemaleProfile, MaleProfile } from "../../assets/image";
import IconButton from "../../components/IconButton";
import { applicantInputMaps } from "../../models/applicantInitialValue";
import Input from "../../components/Input";
import EditIcon from "../../assets/icons/Edit_light.svg";
import Expand_Down from "../../assets/icons/Expand_down_light.svg";
import { InputProps } from "../../interface/FormInterface";
import { Form, Formik } from "formik";
import useFetch from "../../hooks/useFetch";
import FetchLoader from "../General/FetchLoader";
import Button from "../../components/Button";

const PromoteBatchExaminiees = ({ APID }: { APID: string }) => {
  const { data, isLoading, isError } = useFetch({
    route: `/applicant/${APID}`,
    key: ["applicant"],
  });

  if (isLoading || isError) return <FetchLoader />;

  const { personalDetails, studentDetails } = data;

  return (
    <Formik initialValues={data} onSubmit={() => {}}>
      <Form>
        <section className="flex justify-between my-4">
          <Typography as="h2">Promotion</Typography>
          <Button title="Promote" />
        </section>
        <section>
          <div className="bg-coverImage bg-cover  bg-no-repeat bg-center w-full h-[200px] rounded-[5px] mb-4 p-4 flex items-end">
            <div className="flex items-center gap-4">
              <Avatar
                src={
                  personalDetails?.gender === "Male"
                    ? MaleProfile
                    : FemaleProfile
                }
                size="84px"
              />
              <div className="text-white">
                <Typography as="h4">
                  {personalDetails?.lastName}, {personalDetails?.firstName}{" "}
                  {personalDetails?.middleName[0]}
                </Typography>
                <Typography as="span">
                  {studentDetails?.yearLevel} {studentDetails?.track}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {applicantInputMaps.map((section) => (
              <FormSection key={section.title} {...section} />
            ))}
          </div>
        </section>
      </Form>
    </Formik>
  );
};

const FormSection = ({ title, model }: any) => {
  const [hide, setHide] = useState(false);
  const [onEdit, setOnEdit] = useState(true);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h4 className="cursor-pointer" onClick={() => setHide((prev) => !prev)}>
          {title}
        </h4>

        <div className="flex gap-4">
          <IconButton
            icon={EditIcon}
            onClick={() => setOnEdit((prev) => !prev)}
          />
          <IconButton
            icon={Expand_Down}
            onClick={() => setHide((prev) => !prev)}
          />
        </div>
      </div>

      {hide && (
        <div className="grid grid-cols-2 gap-4">
          {model.map((props: InputProps) => (
            <Input key={props.label} {...props} disabled={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoteBatchExaminiees;
