import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";
import CalendarIcon from "../assets/icons/Calendar.svg";
import FilterIcon from "../assets/icons/Filter.svg";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import ApplicantIcon from "../assets/icons/Applicants.svg";
import { useState, MouseEvent } from "react";

useState;

const Applicant = () => {
  const [filterSelect, setFilterSelect] = useState<string>("");

  const handleFilterSelect = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterSelect(event.currentTarget.name);
  };

  const TabLists = [
    {
      title: "Pending",
      active: true,
    },
    {
      title: "Accepted",
      active: false,
    },
    {
      title: "Revision",
      active: false,
    },
  ];

  const FilterList = [
    {
      title: "Applicant",
      icon: ApplicantIcon,
    },
    {
      title: "Accepted",
      icon: ApplicantIcon,
    },
    {
      title: "Loved",
      icon: ApplicantIcon,
    },
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
          <section className="flex justify-between items-center">
            <SearchBar />

            <div className="flex gap-4 items-center">
              <Dropdown
                as="button"
                dir="left"
                title="August 23,2023"
                type="outlined"
                icon={CalendarIcon}></Dropdown>

              <Dropdown
                className="min-w[137px]"
                title={filterSelect ? filterSelect : "Filter"}
                as="button"
                icon={FilterIcon}
                type="outlined">
                {FilterList.map(item => (
                  <Button
                    key={item.title}
                    type="unstyled"
                    className="w-full"
                    dir="left"
                    icon={item.icon}
                    title={item.title}
                    name={item.title}
                    onClick={handleFilterSelect}
                  />
                ))}
              </Dropdown>

              <Dropdown as="icon" type="outlined"></Dropdown>
            </div>
          </section>
        </Tabs.Content>
      </Tabs>
    </BaseLayout>
  );
};

export default Applicant;
