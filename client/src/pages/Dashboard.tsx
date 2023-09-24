import Stats from "../components/Stats";
import Typography from "../components/Typography";
import BaseLayout from "../layouts/BaseLayout";
import statsData from "../data/statsData.json";

import Stack from "../components/Stack";
import useStats from "../hooks/useStats";
import { StatsInterface } from "../interface/componentInterface";

const Dashboard = () => {
  const currentData: StatsInterface[] = statsData;
  const { stats } = useStats(currentData);

  return (
    <BaseLayout>
      {/* // Stats Section */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map(items => (
          <Stats
            key={items.title}
            className="flex flex-col gap-4 px-6 py-4 rounded-[5px] bg-white border border-gray-200 shadow-[0px_0px_3px_##919eab29]">
            {/* Stats Header */}

            <Stats.Header type="header" className="flex justify-between">
              <Stats.Label as="h5">Total</Stats.Label>
              <Stats.Type as="h6" type={items.type} value={300} />
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
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>

        <Stack>
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>
      <section className="grid grid-cols-[auto_370px] gap-4">
        <Stack>
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
        <Stack>
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>

      <section className="bg-[#cccccc] w-full h-[300px] rounded-[5px]"></section>

      <section className="grid grid-cols-[auto_370px] gap-4">
        <Stack>
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
        <Stack>
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>
    </BaseLayout>
  );
};

export default Dashboard;
