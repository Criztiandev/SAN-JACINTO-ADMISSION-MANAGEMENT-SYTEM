import Badge from "./components/Badge";
import Card from "./components/Card";
import IconButton from "./components/IconButton";

import Nav from "./containers/Nav";
import Typography from "./components/Typography";

interface CardDataType {
  added: number;
  total: string;
  title: string;
}

const App = () => {
  const name = "Criztian Jade M Tuplano";
  const cardData: CardDataType[] = [
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
    <>
      <Nav />

      <main className="px-8 py-4 flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <div>
            <Typography as="h1">Welcome {name}</Typography>
            <Typography as="small">Hello there, I miss you</Typography>
          </div>

          <div className="flex gap-4">
            <IconButton />
            <IconButton />
          </div>
        </header>

        <section className="grid grid-cols-3 gap-4">
          {cardData.map(items => (
            <div
              key={items.title}
              className="flex flex-col gap-4 px-6 py-4 border border-black rounded-[5px]">
              <div className="flex justify-between">
                <Typography as="h5">Total</Typography>
                <Badge>+{items.added}</Badge>
              </div>

              <div>
                <Typography as="h2">{items.total}</Typography>
                <Typography as="p">{items.title}</Typography>
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-[auto_370px] gap-4">
          <Card>
            <Card.Header
              title=" Applicants Graph "
              className="flex justify-between items-center">
              <IconButton />
            </Card.Header>
            <Card.Content>
              <div className="flex  gap-4 p-4">
                <span className="flex items-center gap-4">
                  <span className="p-4 bg-blue-400 rounded-full"></span>
                  <Typography as="p">Junior</Typography>
                </span>
                <span className="flex items-center gap-4">
                  <span className="p-4 bg-blue-500 rounded-full"></span>
                  <Typography as="p">Senior</Typography>
                </span>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header title="Blogs"></Card.Header>
          </Card>
        </section>
      </main>
    </>
  );
};

export default App;
