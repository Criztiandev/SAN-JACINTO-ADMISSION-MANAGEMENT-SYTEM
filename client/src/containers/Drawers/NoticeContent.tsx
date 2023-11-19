import Typography from "../../components/Typography";
import Button from "../../components/Button";
import useURL from "../../hooks/useURL";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const NoticeContent = () => {
  const { user, handleMutateUser } = useAuthContext();
  const { navigateBack, queryParams, updateURL } = useURL();

  const title = queryParams.get("state") || "title";

  const handleCancel = () => {
    navigateBack;
  };

  const handleConfirm = () => {
    if (user) {
      handleMutateUser("");
      updateURL("/");
      toast.success("Log out Successfully");
    }
  };

  return (
    <div className="flex justify-between flex-col h-full">
      <div>
        <div className="border-b border-gray-400 py-4">
          <span className="text-[18px] font-semibold opacity-80 italic">
            Notice:
          </span>
          <Typography as="h2" className="font-bold">
            Are you absolutely certain you want to {title} ?
          </Typography>
        </div>

        <div className="my-4">
          <Typography as="p" className="text-[16px]">
            Logging out is a decisive action and will end your current session.
            Please take a moment to ensure that you want to proceed with this
            action, as any unsaved data or changes may be lost. If you confirm,
            you will be logged out, and any unsaved work will not be
            recoverable. Take a moment to consider before finalizing your
            decision
          </Typography>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button title="Cancel" as="outlined" onClick={handleCancel} />
        <Button title="Confirm" onClick={handleConfirm} />
      </div>
    </div>
  );
};

export default NoticeContent;
