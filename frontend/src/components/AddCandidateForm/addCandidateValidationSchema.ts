import * as Yup from "yup";

export const addCandidateValidationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  phone: Yup.string().required("Requerido"),
  email: Yup.string().email("Formato email no válido").required("Requerido"),
  address: Yup.string().required("Requerido"),
  education: Yup.number().required("Requerido"),
  experience: Yup.number().required("Requerido"),
  cv: Yup.mixed()
    .required("Requerido")
    .test("fileType", "Formato del archivo no válido", (value) => {
      return (
        value instanceof File &&
        (value.type === "application/pdf" ||
          value.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      );
    }),
});
