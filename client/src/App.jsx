import Radio from "./components/Radio";

function App() {
  return (
    <>
      <Radio group="favline">
        <Radio.Title title={"Ano ang Fav Line mo ?"} />
        <Radio.Item name="I miss you" />
        <Radio.Item name="Balik Kana" />
        <Radio.Item name="Teka lng i miss you" />
        <Radio.Item name="Yes Opo Yes" />
      </Radio>
    </>
  );
}

export default App;
