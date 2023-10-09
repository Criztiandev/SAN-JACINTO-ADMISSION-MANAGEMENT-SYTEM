import { Input, IconButton } from "../../components";
import RadioItems from "../Register/RadioItems";
const AccountDetails = () => {
  return (
    <section className="flex justify-center items-center h-full">
      <div className="flex justify-center items-center flex-col gap-8">
        <RadioItems title="Facebook" subtitle="Social Media" index={0} />

        <div className="flex gap-2">
          <Input name="facebook" placeholder="Enter your FB Profile Link" />
          <IconButton type="contained" className="w-12 h-12" />
        </div>
      </div>
    </section>
  );
};

export default AccountDetails;
