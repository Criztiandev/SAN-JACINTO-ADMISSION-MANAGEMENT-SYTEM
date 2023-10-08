import { Input } from "../../components";
import { applicantInputMaps } from "../../models/applicantModel";

const ApplicationForm = () => {
  return (
    <section>
      {applicantInputMaps.map(items => (
        <div className="mb-8">
          <h4 className="border-b border-gray-300 pb-2 mb-4">{items.title}</h4>
          <div className="grid grid-cols-2 gap-4">
            {items.details.map(data => (
              <Input {...data} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ApplicationForm;
