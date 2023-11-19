import * as yup from "yup";

export const scheduleSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Title is Required"),
  facilitator: yup
    .string()
    .min(3, "Too short")
    .max(64, "Too long")
    .required("Facilitator is Required"),
  batches: yup.array().of(yup.string()).required("Batches is Required"),

  schedule: yup.object().shape({
    start: yup.date().required(),
    end: yup.date().required(),
  }),

  time: yup.object().shape({
    start: yup.string().required("Start Time is Required"),
    end: yup.string().required("End Time is Required"),
  }),

  venue: yup
    .string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Venue is Required"),
  details: yup
    .string()
    .min(3, "Too short")
    .max(255, "Too long")
    .required("Details is Required"),
});
