import { ReactNode } from "react";

// Layout Props
export interface panelTitleInterface {
  "Grade Level"?: string;
  "Student Details"?: string;
  "Personal Details"?: string;
  "Permanent Address"?: string;
  "Guardian Details"?: string;
  "Other Details"?: string;
  "Account Details"?: string;
  "Application Form"?: string;
  "Thank you"?: string;
}

// Panel Stepper Template
export interface StepperProps {
  title: string;
  component: ReactNode;
}

export interface ItemSelection {
  cover: string;
  title: string;
  subtitle: string;
}

// Registration layout props
