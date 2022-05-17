import * as yup from "yup";

export const courseSchema = yup.object().shape({
    title: yup.string().required("Course name is required."),
    timeslot: yup.string(),
    location: yup.string(),
    instructorId: yup.number()
});