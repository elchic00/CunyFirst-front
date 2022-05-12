import * as yup from "yup";

export const instructorSchema = yup.object().shape({
    firstname: yup.string().required("First name is required."),
    lastname: yup.string().required("Last name is required."),
    department: yup.string(),//.required("Department is required"),
    // .required("Location is required"),
    imageUrl: yup.string()
});