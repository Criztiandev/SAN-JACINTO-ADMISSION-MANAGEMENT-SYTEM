import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";
import CalendarIcon from "../assets/icons/Calendar.svg";
import FilterIcon from "../assets/icons/Filter.svg";
import Dropdown from "../components/Dropdown";

const Applicant = () => {
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

  return (
    <BaseLayout title="Applicants" action>
      <Tabs>
        <Tabs.List className="flex mb-6 border-b">
          {TabLists.map(tabs => (
            <Tabs.Link
              className={`cursor-pointer ${
                tabs.active && "border-b-[1.5px] border-black"
              } px-6 py-2`}>
              <Typography as="h6">{tabs.title}</Typography>
            </Tabs.Link>
          ))}
        </Tabs.List>
        <Tabs.Content>
          <section className="flex justify-between items-center">
            <SearchBar as="icon" />

            <div className="flex gap-4 items-center">
              <Button
                dir="left"
                title="August 23,2023"
                type="outlined"
                icon={CalendarIcon}
              />

              <Button
                dir="left"
                title="Filter"
                type="outlined"
                icon={FilterIcon}
              />

              <Dropdown type="outlined" />
            </div>
          </section>
        </Tabs.Content>
      </Tabs>
    </BaseLayout>
  );
};

export default Applicant;
