// Dashboard stats interface
export interface StatsInterface {
  added: number;
  total: string;
  title: string;
}

export interface useDrawerProps {
  active: boolean;
  setActive: () => void;
  toggleDrawer: () => void;
}
