import Tabs from "../components/Tabs";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";

const Message = () => {
  const TabLists = [
    {
      title: "Message",
      active: true,
    },
    {
      title: "Annoucement",
      active: false,
    },
  ];

  return (
    <BaseLayout title="Message">
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

export default Message;
