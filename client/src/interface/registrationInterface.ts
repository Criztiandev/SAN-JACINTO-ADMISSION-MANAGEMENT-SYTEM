import { BaseProps } from "./componentInterface";

// Layout Props
export interface panelTitleInterface {
  "Grade Level"?: string;
  "Student Details"?: string;
  "Personal Details"?: string;
  "Permanent Address"?: string;
  "Guardian Details"?: string;
  "Other Details"?: string;
  "Account Details"?: string;
  Checkpoint?: string;
  "Application Form"?: string;
  "Thank you"?: string;
}

// Registration layout props
export interface registrationLayoutProps extends BaseProps {
  activePanel: string;
}
