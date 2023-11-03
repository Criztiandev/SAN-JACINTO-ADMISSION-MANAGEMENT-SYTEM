/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useModalOptions, useModalProps } from "../interface/Modal.Type";

const useModal = ({ data = [] }: useModalProps): useModalOptions => {
  const memoizedData = useMemo(() => data, [data]);
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxLength: number = memoizedData?.length || 0;
  const isFirstIndex: boolean = currentIndex === 0;
  const isLastIndex: boolean = currentIndex === maxLength - 1;

  const showModal = () => setActive(true);
  const hideModal = () => setActive(false);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev >= maxLength ? prev : prev + 1));

  // Prev Step
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev <= 0 ? prev : prev - 1));

  const resetIndex = () => setCurrentIndex(0);

  return {
    data: memoizedData,
    currentIndex,
    active,
    showModal,
    hideModal,

    isFirstIndex,
    isLastIndex,
    maxLength,

    handleNext,
    handlePrev,
    resetIndex,
  };
};

export default useModal;
