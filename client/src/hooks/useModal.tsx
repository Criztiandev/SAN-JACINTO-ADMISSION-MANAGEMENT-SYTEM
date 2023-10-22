/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";

interface useModalProps {
  data?: Array<object>;
}

const useModal = ({ data = [] }: useModalProps) => {
  const memoizedData = useMemo(() => data, [data]);
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxLength: number = memoizedData?.length || 0;
  const firstIndex: boolean = currentIndex === 0;
  const lastIndex: boolean = currentIndex === maxLength - 1;

  const showModal = () => setActive(true);
  const hideModal = () => setActive(false);

  const handleNext = () =>
    setCurrentIndex(prev => (prev >= maxLength ? prev : prev + 1));

  // Prev Step
  const handlePrev = () =>
    setCurrentIndex(prev => (prev <= 0 ? prev : prev - 1));

  const handleResetIndex = () => setCurrentIndex(0);

  return {
    data: memoizedData,
    currentIndex,
    active,
    showModal,
    hideModal,

    firstIndex,
    lastIndex,
    maxLength,

    handleNext,
    handlePrev,
    handleResetIndex,
  };
};

export default useModal;
