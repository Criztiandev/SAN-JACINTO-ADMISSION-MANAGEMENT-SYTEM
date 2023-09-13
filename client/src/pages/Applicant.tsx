import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";

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
        <Tabs.List className="flex">
          {TabLists.map(tabs => (
            <Tabs.Link
              className={`cursor-pointer ${
                tabs.active && "border-b-[1.5px] border-black"
              } px-6 py-2`}>
              <Typography as="h6">{tabs.title}</Typography>
            </Tabs.Link>
          ))}
        </Tabs.List>

        <Tabs.Content></Tabs.Content>
      </Tabs>
    </BaseLayout>
  );
};

export default Applicant;
