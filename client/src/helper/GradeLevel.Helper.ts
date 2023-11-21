import { JrTracksItemModel, SHSTracksItemModel } from "../data/Stepper.Data";
import { GradesProps } from "../interface/Stepper.Type";

export const GradeLevelTrack = (grades: GradesProps, level: string) => {
  if (!grades) throw new Error("Error");

  const validLevels = ["Grade 7", "Grade 11", "Grade 12"];

  if (!validLevels.includes(level)) {
    return JrTracksItemModel.filter(({ title }) => title === "Regular");
  }

  const { english, filipino, science, math, generalAve } = grades;
  const isRegularStudent = generalAve >= 75;

  if (!isRegularStudent) {
    return [];
  }

  if (level === "Grade 11" || (level === "Grade 12" && isRegularStudent)) {
    return SHSTracksItemModel;
  }

  // Grade 7
  const isSPE = english >= 85 && math >= 85 && science >= 85 && filipino >= 83;
  const isSPJ = english >= 85 && filipino >= 85 && science >= 80 && math >= 80;

  return JrTracksItemModel.filter(({ title }) => {
    return (
      (isSPE && title === "SPE") ||
      (isSPJ && title === "SPJ") ||
      title === "Regular"
    );
  });
};
