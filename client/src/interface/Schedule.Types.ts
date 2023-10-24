export interface SelectedSlotProps {
  start: Date;
  end: Date;
}
export interface ScheduleContextValues {
  selectedSlot: SelectedSlotProps;
  handleSelectedSlot: (start: Date, end: Date) => void;
}

export interface ScheduleModelProps {
  cover: string;
  title: string;
  venue: string;
  batch: Array<string>;

  date: {
    start: string;
    end: string;
  };

  time: {
    start: string;
    end: string;
  };

  content: string;
}
