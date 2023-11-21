/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import useURL from "../../hooks/useURL";
import useCustomMutation from "../../hooks/useCustomMutation";
import { toast } from "react-toastify";

const DeleteNotice = () => {
  const { navigateBack, queryParams, baseRoute } = useURL();
  const action = queryParams.get("state") || "title";
  const APID = queryParams.get("APID");

  const handleCancel = () => {
    navigateBack();
  };

  const { mutate } = useCustomMutation({
    route: `${baseRoute}/${APID}`,
    overrideFn: () => {
      navigateBack("refetch=true");
      toast.success("Deleted Successfully");
    },
    type: "delete",
  });

  const handleConfirm = () => {
    mutate({});
  };

  return (
    <div className="flex justify-between flex-col h-full">
      <div>
        <div className="border-b border-gray-400 py-4">
          <Typography as="h2" className="font-bold">
            Are you absolutely certain you want to {action} ?
          </Typography>
        </div>

        <div className="my-4">
          <Typography as="p" className="text-[16px]">
            Please note that once this data is deleted, it cannot be recovered.
            If you have any concerns or doubts about this action, please reply
            to this email or contact our support team at our school at your
            earliest convenience.
          </Typography>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          title="Cancel"
          type="button"
          as="outlined"
          onClick={handleCancel}
        />
        <Button title="Confirm" onClick={handleConfirm} />
      </div>
    </div>
  );
};

export default DeleteNotice;
