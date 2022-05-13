import * as yup from "yup";

export const courseSchema = yup.object().shape({
    title: yup.string().required("Course name is required."),
    timeslot: yup.string()
        .required("Time of course is required")
        .min(4, "timeslot must include starting and ending time."),
    location: yup.string(),
    instructorId: yup.number()
});