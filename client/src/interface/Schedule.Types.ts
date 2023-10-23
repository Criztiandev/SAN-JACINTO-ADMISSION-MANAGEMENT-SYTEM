export interface SelectedSlotProps {
  start: Date | "";
  end: Date | "";
}
export interface ScheduleContextValues {
  selectedSlot: SelectedSlotProps;
  handleSelectedSlot: (start: Date, end: Date) => void;
}
