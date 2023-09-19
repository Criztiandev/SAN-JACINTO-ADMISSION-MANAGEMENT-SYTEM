import Stats from "../components/Stats";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";

import Stack from "../components/Stack";
import { StatsInterface } from "../interface/dashboardInterface";

const Dashboard = () => {
  const statsData: StatsInterface[] = [
    {
      added: 23,
      total: "18,000",
      title: "Junior",
    },
    {
      added: 23,
      total: "18,000",
      title: "Senior",
    },
    {
      added: 23,
      total: "18,000",
      title: "Attendies",
    },
  ];

  return (
    <BaseLayout>
      {/* // Stats Section */}
      <section className="grid grid-cols-3 gap-4">
        {statsData.map(items => (
          <Stats
            key={items.title}
            className="flex flex-col gap-4 px-6 py-4 border border-black rounded-[5px]">
            {/* Stats Header */}

            <Stats.Header type="header" className="flex justify-between">
              <Stats.Label as="h5">Total</Stats.Label>
              <Stats.Type as="h6" type="increase" value={300} />
            </Stats.Header>

            <Stats.Content type="main">
              <Stats.Number as="h2" value={items.total} />
              <Stats.Helper type="div">
                <Typography as="p">{items.title}</Typography>
              </Stats.Helper>
            </Stats.Content>
          </Stats>
        ))}
      </section>
      {/* // Graph Section */}
      <section className="grid grid-cols-[auto_370px] gap-4">
        <Stack>
          <Stack.Header title="Applicant Graph" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>

        <Stack>
          <Stack.Header title="Schedule" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>
      <section className="grid grid-cols-[auto_370px] gap-4">
        <Stack>
          <Stack.Header title="Schedule" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
        <Stack>
          <Stack.Header title="Schedule" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>

      <section className="bg-[#cccccc] w-full h-[300px] rounded-[5px]"></section>

      <section className="grid grid-cols-[auto_370px] gap-4">
        <Stack>
          <Stack.Header title="Recent Files" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
        <Stack>
          <Stack.Header title="Messages" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>
    </BaseLayout>
  );
};

export default Dashboard;
