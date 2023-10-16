import { InputProps } from "../../interface/FormInterface";

export const NameDetailsSection = (name: string): InputProps[] => [
  {
    label: "First Name",
    name: `${name}.firstName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Middle Name",
    name: `${name}.middleName`,
    placeholder: "Enter your First Name",
  },

  {
    label: "Last Name",
    name: `${name}.lastName`,
    placeholder: "Enter your First Name",
  },
];

export const PersonalDetailsSection = (
  omit: Array<string> | string
): InputProps[] => {
  const personalDetailsArr: InputProps[] = [
    {
      label: "First Name",
      name: `personalDetails.firstName`,
      placeholder: "Enter your First Name",
    },

    {
      label: "Middle Name",
      name: `personalDetails.middleName`,
      placeholder: "Enter your First Name",
    },

    {
      label: "Last Name",
      name: `personalDetails.lastName`,
      placeholder: "Enter your First Name",
    },

    {
      type: "date",
      label: "Birth Date",
      name: "personalDetails.birthDate",
    },
    {
      type: "number",
      label: "Age",
      name: "personalDetails.age",
      placeholder: "Enter your Age",
    },
    {
      type: "email",
      label: "Email",
      name: "personalDetails.email",
      placeholder: "Enter your @email",
    },

    {
      type: "number",
      label: "Contact",
      name: "personalDetails.contact",
      placeholder: "Enter your phone number",
    },

    {
      type: "string",
      label: "Facebook Link",
      name: "personalDetails.facebookLink",
      placeholder: "Enter your facebook link",
    },

    {
      label: "Mother Tounge",
      name: "personalDetails.motherTounge",
      placeholder: "Enter",
    },
  ];

  return personalDetailsArr.filter((items: InputProps) => {
    const { label } = items;
    if (!Array.isArray(omit) && label !== omit) return items;

    return !omit?.includes(label || "");
  });
};
