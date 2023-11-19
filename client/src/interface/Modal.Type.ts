export interface useModalProps {
  data?: Array<object>;
}

export interface useModalOptions {
  data: Array<object>;
  currentIndex: number;
  active: boolean;

  isFirstIndex: boolean;
  isLastIndex: boolean;
  maxLength: number;

  showModal: () => void;
  hideModal: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  resetIndex: () => void;
}
