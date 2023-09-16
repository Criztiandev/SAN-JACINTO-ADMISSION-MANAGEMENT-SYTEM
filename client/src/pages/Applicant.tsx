/* eslint-disable @typescript-eslint/no-explicit-any */
import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";
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
import MonthPicker from "../containers/MonthPicker";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

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
      cell: (key: any) => (
        <div className="grid grid-cols-[16px_auto_auto] gap-4 px-4 items-center">
          <input type="checkbox" className="w-full h-full" />
          <Avatar />
          <span>{key.getValue()}</span>
        </div>
      ),
    },
    { header: "LRN", accessorKey: "LRN" },
    { header: "Gender", accessorKey: "gender" },
    { header: "BOD", accessorKey: "BOD" },
    { header: "Age", accessorKey: "age" },
    { header: "Guardian", accessorKey: "guardian.legal" },
    { header: "Contact", accessorKey: "contact" },
    { header: "Ave", accessorKey: "remarks" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (key: any) => <Badge title={key.getValue()} />,
    },
    {
      header: "Action",
      cell: () => (
        <span className="flex gap-4">
          <IconButton icon={AcceptIcon} type="ghost" />
          <IconButton icon={EditIcon} type="ghost" />
          <Dropdown as="icon" type={"ghost"} className="z-20">
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
          <div className="max-w-[1129px] overflow-hidden flex flex-col gap-4">
            {/* Table Component */}
            <Table
              data={applicantData}
              config={TableConfig}
              layout={
                "270px 150px 100px 100px 100px 200px 150px 100px 100px 200px"
              }>
              <div className="flex justify-between items-center">
                <Table.SearchBar />

                <div className="flex justify-between gap-4">
                  <MonthPicker />

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
          </div>
        </Tabs.Content>
      </Tabs>
    </BaseLayout>
  );
};

export default Applicant;
