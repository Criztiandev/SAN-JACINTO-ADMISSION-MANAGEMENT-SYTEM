/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { ItemSelection } from "../interface/registrationInterface";

// Define the interface for the hook's return value
interface RadioSelectHook {
  data: ItemSelection[];
  currentSelectedIndex: number;
  nextItem: () => void;
  prevItem: () => void;

  handleSelectItem: (value: number) => void;
  setCurrentSelectedIndex: (index: number) => void;
}

const useRadioSelect = (items: ItemSelection[]): RadioSelectHook => {
  const data = useMemo(() => items, [items]);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<number>(-1);

  const nextItem = () =>
    setCurrentSelectedIndex(prev =>
      prev >= data.length - 1 ? prev : prev + 1
    );

  const prevItem = () =>
    setCurrentSelectedIndex(prev => (prev <= 0 ? prev : prev - 1));

  const handleSelectItem = (value: number) => setCurrentSelectedIndex(value);

  return {
    data,
    currentSelectedIndex,
    nextItem,
    prevItem,
    handleSelectItem,
    setCurrentSelectedIndex,
  };
};

export default useRadioSelect;
