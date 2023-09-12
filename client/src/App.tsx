import Card from "./components/Card";
import ColorLabel from "./components/ColorLabel";
import Stats from "./components/Stats";
import Typography from "./components/Typography";
import BaseLayout from "./layouts/BaseLayout";

import Stack from "./components/Stack";

import Kebbab from "./assets/icons/Kebbab.svg";
interface StatsInterface {
  added: number;
  total: string;
  title: string;
}

const App = () => {
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
        <Card>
          <Card.Header title="Applican Graph" icon={Kebbab} />

          <Card.Content>
            <div className="flex  gap-4 p-4">
              <ColorLabel title="Junior" size={16} color="#cccccc" />
              <ColorLabel title="Senior" size={16} color="#cccccc" />
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header title="Blogs" icon="I"></Card.Header>
        </Card>
      </section>
      <section className="grid grid-cols-[auto_370px] gap-4">
        <Stack>
          <Stack.Header title="Schedule" />
          <Stack.Content dir="vertical" spacing={16}></Stack.Content>
        </Stack>
      </section>
    </BaseLayout>
  );
};

export default App;
