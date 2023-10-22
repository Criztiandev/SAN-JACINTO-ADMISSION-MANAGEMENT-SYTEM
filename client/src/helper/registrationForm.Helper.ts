import MaleProfile from "../assets/image/Male_profile.png";
import FemaleProfile from "../assets/image/Female_Profile.png";
import { ItemSelectProps } from "../interface/FormInterface";

export const OutroDetails = [
  {
    title: "Congratulations",
    desc: " Thank you on your admission to our school! Your examination schedule has been sent to your Facebook account.",
  },

  {
    title: "Exciting Journey",
    desc: "  As you embark on this exciting journey, please keep in mind that your registered Facebook account will serve as the primary channel for receiving all school updates.",
  },

  {
    title: "Stay Tuned",
    desc: " Stay connected to stay informed about events and important announcements. If you ever have any questions, don't hesitate to use your private account to get in touch. We're here to support you every step of the way!",
  },
];

export const GenderSelectionItems = [
  { cover: MaleProfile, title: "Male", subtitle: "Masculine" },
  { cover: FemaleProfile, title: "Female", subtitle: "Feminine" },
];

export const GuadianChoices: ItemSelectProps[] = [
  { cover: "null", title: "Father", subtitle: "Strong" },
  { cover: "null", title: "Mother", subtitle: "Caring" },
  { cover: "null", title: "Other", subtitle: "Prefered" },
];
