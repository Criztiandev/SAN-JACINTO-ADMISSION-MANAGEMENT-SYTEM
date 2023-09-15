/* eslint-disable @typescript-eslint/no-explicit-any */
import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";
import CalendarIcon from "../assets/icons/Calendar.svg";
import Dropdown from "../components/Dropdown";
import ApplicantIcon from "../assets/icons/Applicants.svg";
import Table from "../components/Table";
import { applicantData } from "../data/applicantData";

const Applicant = () => {
  const TabLists = [
    { title: "Pending", active: true },
    { title: "Accepted", active: false },
    { title: "Revision", active: false },
  ];

  const FilterList = [
    { title: "Kruger", icon: ApplicantIcon },
    { title: "Accepted", icon: ApplicantIcon },
    { title: "Loved", icon: ApplicantIcon },
  ];

  const TableConfig: any[] = [
    {
      header: "Name",
      accessorFn: ({ last_name, first_name, middle_name }: any) =>
        `${last_name}, ${first_name} ${middle_name}`,
    },
    { header: "LRN", accessorKey: "LRN" },
    { header: "Gender", accessorKey: "gender" },
    { header: "BOD", accessorKey: "BOD" },
    { header: "Age", accessorKey: "age" },
    { header: "Guarduan", accessorKey: "guardian.legal" },
    { header: "Contact", accessorKey: "contact" },
    { header: "Ave", accessorKey: "remarks" },
    { header: "Status", accessorKey: "status" },
    { header: "Action", accessorKey: "Status" },
  ];

  return (
    <BaseLayout title="Applicants" action>
      <Tabs>
        <Tabs.List className="flex mb-6 border-b">
          {TabLists.map(tabs => (
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
            <Table data={applicantData} config={TableConfig} col={9}>
              <Table.Parts
                type="div"
                className="flex justify-between items-center">
                <Table.SearchBar />

                <Table.Parts className="flex justify-between gap-4">
                  <Dropdown
                    as="button"
                    dir="left"
                    title="August 23,2023"
                    type="outlined"
                    icon={CalendarIcon}></Dropdown>

                  <Table.Filter lists={FilterList} />

                  <Dropdown as="icon" type="outlined"></Dropdown>
                </Table.Parts>
              </Table.Parts>

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
