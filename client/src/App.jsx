import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <>
      <Button>Reset</Button>
      <Input title="Email" name="email" error="Invalid Email" />
    </>
  );
}

export default App;
