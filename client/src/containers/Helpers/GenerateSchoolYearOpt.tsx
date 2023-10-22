const GenerateSchoolYearOpt = (target = 2005) => {
  const currentYear = new Date().getFullYear();
  const options = [];
  for (let year = target; year <= currentYear; year++) {
    const schoolYear = `${year} - ${
      year + 1 === currentYear + 1 ? "Current" : year + 1
    }`;

    options.push(
      <option key={schoolYear} value={schoolYear}>
        {schoolYear}
      </option>
    );
  }

  return options || [];
};

export default GenerateSchoolYearOpt;
