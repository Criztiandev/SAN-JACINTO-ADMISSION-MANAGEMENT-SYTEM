import { ItemSelection } from "../interface/Registration.Type";

export const yearLevels: ItemSelection[] = [
  { cover: "null", title: "Grade 7", subtitle: "Freshies" },
  { cover: "null", title: "Grade 8", subtitle: "Freshies" },
  { cover: "null", title: "Grade 9", subtitle: "Freshies" },
  { cover: "null", title: "Grade 10", subtitle: "Freshies" },
  { cover: "null", title: "Grade 11", subtitle: "Freshies" },
  { cover: "null", title: "Grade 12", subtitle: "Freshies" },
];

// Radio Selection Objects
export const JrTracks: ItemSelection[] = [
  { cover: "null", title: "Regular", subtitle: "General Academic Strand" },
  { cover: "null", title: "SPE", subtitle: "General Academic Strand" },
  { cover: "null", title: "SPJ", subtitle: "General Academic Strand" },
];

export const SHSTracks: ItemSelection[] = [
  { cover: "null", title: "GAS", subtitle: "General Academic Strand" },
  {
    cover: "null",
    title: "STEM",
    subtitle: "Science, Technology, Engineering, and Mathematics",
  },
  {
    cover: "null",
    title: "ABM",
    subtitle: "Accountancy Business Management",
  },

  {
    cover: "null",
    title: "EIM",
    subtitle: "EIM",
  },

  {
    cover: "null",
    title: "ICT",
    subtitle: "Information Communication and Technology",
  },

  {
    cover: "null",
    title: "BPP",
    subtitle: "BPP",
  },
];

export const GradeLevelTrack = (
  grades: Array<string>,
  level: "Grade 7" | "Grade 11" | "Grade 12"
) => {
  const { english, filipino, science, math, generalAve } = grades;

  const isRegularStudent = generalAve >= 75;

  if (level === "Grade 7") {
    const isSPETrack =
      english >= 85 && math >= 85 && science >= 85 && filipino >= 83;
    const isSPJTrack =
      english >= 85 && filipino >= 85 && science >= 80 && math >= 80;

    if (!isRegularStudent) {
      return [];
    }

    return JrTracks.filter(props => {
      if (isSPETrack && props.title === "SPE") {
        return true;
      } else if (isSPJTrack && props.title === "SPJ") {
        return true;
      } else {
        return props.title === "Regular";
      }
    });
  } else if (
    level === "Grade 11" ||
    (level === "Grade 12" && isRegularStudent)
  ) {
    return SHSTracks;
  }

  return [];
};
