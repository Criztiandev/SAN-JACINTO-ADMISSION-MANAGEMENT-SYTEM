export interface PanelStepList {
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

export interface GradesProps {
  english: number;
  filipino: number;
  science: number;
  math: number;
  generalAve: number;
}
