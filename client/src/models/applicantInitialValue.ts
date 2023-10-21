export const applicantInputMaps = [
  {
    title: "Student Details",
    model: [
      {
        label: "LRN",
        name: "studentDetails.LRN",
        placeholder: "Enter your LRN",
      },
      {
        label: "PSA Ref#",
        name: "studentDetails.PSA",
        placeholder: "Enter your PSA Reference",
      },
      {
        label: "Year Level",
        name: "studentDetails.yearLevel",
        placeholder: "Enter your Year level",
      },

      {
        label: "Track",
        name: "studentDetails.track",
        placeholder: "Enter your Track",
      },

      {
        label: "School Year",
        name: "studentDetails.schoolYear",
        placeholder: "Enter your School Year",
      },

      {
        label: "Last School Attended",
        name: "studentDetails.lastSchoolAttended",
        placeholder: "Enter your School Last Attended",
      },
    ],
  },

  {
    title: "Personal Details",
    model: [
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
    ],
  },

  // current address
  {
    title: "Current Address",
    model: [
      {
        label: "House No.",
        name: `addressDetails.current.houseNo`,
        placeholder: `Enter your House number`,
      },
      {
        label: "Street",
        name: `addressDetails.current.street`,
        placeholder: `Enter your House number`,
      },
      {
        label: "Barangay",
        name: `addressDetails.current.barangay`,
        placeholder: "Enter your Barangay",
      },

      {
        label: "Municipality",
        name: `addressDetails.current.municipality`,
        placeholder: "Enter your Municipality",
      },

      {
        label: "Province",
        name: `addressDetails.current.province`,
        placeholder: "Enter your Province",
      },

      {
        label: "Country",
        name: `addressDetails.current.country`,
        placeholder: "Enter your Country",
      },

      {
        label: "Zip Code",
        name: `addressDetails.current.zip`,
        placeholder: "Enter your Zip Code",
      },
    ],
  },

  // Permanent address
  {
    title: "Permanent Address",
    model: [
      {
        label: "House No.",
        name: `addressDetails.permanent.houseNo`,
        placeholder: `Enter your House number`,
      },
      {
        label: "Street",
        name: `addressDetails.permanent.street`,
        placeholder: `Enter your House number`,
      },
      {
        label: "Barangay",
        name: `addressDetails.permanent.barangay`,
        placeholder: "Enter your Barangay",
      },

      {
        label: "Municipality",
        name: `addressDetails.permanent.municipality`,
        placeholder: "Enter your Municipality",
      },

      {
        label: "Province",
        name: `addressDetails.permanent.province`,
        placeholder: "Enter your Province",
      },

      {
        label: "Country",
        name: `addressDetails.permanent.country`,
        placeholder: "Enter your Country",
      },

      {
        label: "Zip Code",
        name: `addressDetails.permanent.zip`,
        placeholder: "Enter your Zip Code",
      },
    ],
  },

  {
    title: "Fathers Details",
    model: [
      {
        label: "Father's First Name",
        name: "guardianDetails.father.firstName",
      },
      {
        label: "Father's Middle Name",
        name: "guardianDetails.father.middleName",
      },
      { label: "Father's Last Name", name: "guardianDetails.father.lastName" },
      { label: "Father's Contact ", name: "guardianDetails.father.contact" },
    ],
  },

  {
    title: "Mother's Details",
    model: [
      {
        label: "Mother's First Name",
        name: "guardianDetails.mother.firstName",
        placeholder: "Enter tour Mother's First name",
      },
      {
        label: "Mother's Middle Name",
        name: "guardianDetails.mother.middleName",
        placeholder: "Enter tour Mother's Middle name",
      },
      {
        label: "Mother's Last Name",
        name: "guardianDetails.mother.lastName",
        placeholder: "Enter your Mother's Last name",
      },
      {
        label: "Mother's Contact ",
        name: "guardianDetails.mother.contact",
        placeholder: "Enter your Mother's Contact",
      },
    ],
  },

  {
    title: "Legal Guardian's Details",
    model: [
      {
        label: "Legal Guardian's First Name",
        name: "guardianDetails.legalGuardian.firstName",
        placeholder: "Enter tour Legal Guardian's First name",
      },
      {
        label: "Legal Guardian's Middle Name",
        name: "guardianDetails.legalGuardian.middleName",
        placeholder: "Enter tour Legal Guardian's Middle name",
      },
      {
        label: "Legal Guardian's Last Name",
        name: "guardianDetails.legalGuardian.lastName",
        placeholder: "Enter your Legal Guardian's Last name",
      },
      {
        label: "Legal Guardian's Contact ",
        name: "guardianDetails.legalGuardian.contact",
        placeholder: "Enter your Legal Guardian's Contact",
      },
    ],
  },

  {
    title: "Other Details",
    model: [
      { label: "4ps Beneficiary", name: "otherDetails.is4psBeneficiary" },
      { label: "Indigenous People", name: "otherDetails.isIndigenousPerson" },
      { label: "Learners With Disability", name: "otherDetails.isLWD" },
    ],
  },
];
