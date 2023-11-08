import { CalendarIcon, ApplicantIcon } from "../../assets/icons";
import { Button, Typography } from "../../components";
import GraphButton from "./TabButton";
import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
const DashboardPanel = [
  { title: "Admission", icons: CalendarIcon },
  { title: "Applicant", icons: ApplicantIcon },
];

interface TabActionProps {
  selected: string;
  pending: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TabAction = ({ selected, pending, onSelect }: TabActionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 justify-items-start w-full">
        {DashboardPanel.map((props) => (
          <GraphButton
            key={props.title}
            {...props}
            selected={selected}
            pending={pending}
            onClick={onSelect}
          />
        ))}
      </div>

      <div className="w-full h-full p-4 border border-gray-400 rounded-[5px] flex flex-col justify-between items-center gap-4">
        <div className="flex items-center flex-col gap-4">
          <div className="w-32 h-32 rounded-full border border-gray-400"></div>

          <div className="text-center">
            <Typography as="h4" className="font-bold">
              Criztian Jade M Tuplano
            </Typography>
            <span className="text-gray-500 opacity-60 font-medium">
              @criztian
            </span>
          </div>
        </div>

        <div className="border rounded-[5px] p-4 flex flex-col gap-4">
          <Typography as="span" className="flex gap-2 items-center">
            <span>🟢 Status:</span>
            <span className="bg-green-300 px-3  py-1 rounded-full font-semibold cursor-default">
              Active
            </span>
          </Typography>

          <Typography as="span" className="flex gap-2 items-center">
            <span>🟢 Platform:</span>
            <span>Facebook</span>
          </Typography>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-8 p-2 border rounded-full border-gray-400 bg-red-500 font-semibold text-white">
          Turn Off
        </motion.button>
      </div>
    </div>
  );
};

export default TabAction;
