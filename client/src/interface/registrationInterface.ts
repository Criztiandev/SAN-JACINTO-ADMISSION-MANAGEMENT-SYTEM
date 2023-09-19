import { BaseProps } from "./componentInterface";
import { ReactElement } from "react";

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

// Panel Stepper Template
export interface panelTemplate {
  title: string;
  component: ReactElement;
}

export interface ItemSelection {
  cover: string;
  title: string;
  subtitle: string;
}

// Registration layout props
export interface registrationLayoutProps extends BaseProps {
  activePanel: string;
}
