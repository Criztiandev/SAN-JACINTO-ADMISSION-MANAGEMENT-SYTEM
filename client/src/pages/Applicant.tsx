/* eslint-disable @typescript-eslint/no-explicit-any */
import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";
import CalendarIcon from "../assets/icons/Calendar.svg";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import { applicantData } from "../data/applicantData";

import ApplicantIcon from "../assets/icons/Applicants.svg";
import IconButton from "../components/IconButton";
import AcceptIcon from "../assets/icons/Done_light.svg";
import DeleteIcon from "../assets/icons/Delete.svg";
import EditIcon from "../assets/icons/Edit_light.svg";
import Button from "../components/Button";
import MessageIcon from "../assets/icons/Message_light.svg";

const Config = {
  TableList: [
    { title: "Pending", active: true },
    { title: "Accepted", active: false },
    { title: "Revision", active: false },
  ],

  TableConfig: [
    {
      header: "Name",
      accessorFn: ({ last_name, first_name, middle_name }: any) =>
        `${last_name}, ${first_name} ${middle_name}`,
    },
    { header: "LRN", accessorKey: "LRN" },
    { header: "Gender", accessorKey: "gender" },
    { header: "BOD", accessorKey: "BOD" },
    { header: "Age", accessorKey: "age" },
    { header: "Guardian", accessorKey: "guardian.legal" },
    { header: "Contact", accessorKey: "contact" },
    { header: "Ave", accessorKey: "remarks" },
    { header: "Status", accessorKey: "status" },
    {
      header: "Action",
      cell: () => (
        <span className="flex gap-4">
          <IconButton icon={AcceptIcon} type="ghost" />
          <IconButton icon={EditIcon} type="ghost" />
          <Dropdown as="icon" type={"ghost"}>
            <Button
              dir="left"
              icon={MessageIcon}
              title="Message"
              type="ghost"
              name="message"
            />
            <Button
              dir="left"
              icon={DeleteIcon}
              title="Delete"
              type="ghost"
              name="delete"
            />
          </Dropdown>
        </span>
      ),
    },
  ],

  FilterConfig: [
    { title: "Kruger", icon: ApplicantIcon },
    { title: "Accepted", icon: ApplicantIcon },
    { title: "Loved", icon: ApplicantIcon },
  ],
};

const Applicant = () => {
  const { TableConfig, TableList, FilterConfig } = Config;

  return (
    <BaseLayout title="Applicants" action>
      {/*  Tabs */}
      <Tabs>
        <Tabs.List className="flex mb-6 border-b">
          {TableList.map(tabs => (
            <Tabs.Link
              key={tabs.title}
              className={`cursor-pointer ${
                tabs.active && "border-b-[1.5px] border-black"
              } px-6 py-2`}>
              <Typography as="h6">{tabs.title}</Typography>
            </Tabs.Link>
          ))}
        </Tabs.List>

        <Tabs.Content>
          <section className="max-w-[1129px] overflow-hidden flex flex-col gap-4">
            {/* Table Component */}
            <Table
              data={applicantData}
              config={TableConfig}
              layout={
                "300px_100px_150px_100px_100px_200px_150px_100px_100px_200px"
              }>
              <div className="flex justify-between items-center">
                <Table.SearchBar />

                <div className="flex justify-between gap-4">
                  <Dropdown
                    as="button"
                    dir="left"
                    title="August 23,2023"
                    type="outlined"
                    icon={CalendarIcon}></Dropdown>

                  <Table.Filter lists={FilterConfig} />

                  <Dropdown as="icon" type="outlined"></Dropdown>
                </div>
              </div>

              <Table.Container>
                <Table.Header />
                <Table.Body />
              </Table.Container>

              <Table.Action />
            </Table>
          </section>
        </Tabs.Content>
      </Tabs>
    </BaseLayout>
  );
};

export default Applicant;
