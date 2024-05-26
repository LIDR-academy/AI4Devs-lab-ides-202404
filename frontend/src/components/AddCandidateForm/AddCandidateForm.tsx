import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { addCandidateValidationSchema } from "./addCandidateValidationSchema";
import { initialValues } from "./initialValues";

export default function AddCandidateForm() {
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      const response = await fetch("http://localhost:3010/candidates", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setAlert({
        open: true,
        severity: "success",
        message: "Candidato añadido correctamente",
      });
      resetForm();
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: "Error al añadir el candidato",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={addCandidateValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box mb={2}>
              <Field
                name="name"
                as={TextField}
                label="Nombre"
                fullWidth
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="lastName"
                as={TextField}
                label="Apellidos"
                fullWidth
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="phone"
                as={TextField}
                label="Teléfono"
                fullWidth
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                name="address"
                as={TextField}
                label="Dirección"
                fullWidth
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
            </Box>
            <Box mb={2}>
              <FormControl
                fullWidth
                error={touched.education && !!errors.education}
              >
                <InputLabel>Educación</InputLabel>
                <Field name="education" as={Select} label="Educación">
                  <MenuItem value={0}>
                    Educacion secundaria obligatoria
                  </MenuItem>
                  <MenuItem value={1}>Bachiller</MenuItem>
                  <MenuItem value={2}>Formación profesional</MenuItem>
                  <MenuItem value={3}>Estudios universitarios</MenuItem>
                  <MenuItem value={4}>Estudios de postgrado</MenuItem>
                </Field>
                {touched.education && errors.education && (
                  <FormHelperText>{errors.education}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl
                fullWidth
                error={touched.experience && !!errors.experience}
              >
                <InputLabel>Experiencia</InputLabel>
                <Field name="experience" as={Select} label="Experiencia">
                  <MenuItem value={0}>De 0 a 1 año</MenuItem>
                  <MenuItem value={1}>De 1 a 5 años</MenuItem>
                  <MenuItem value={2}>Más de 5 años</MenuItem>
                </Field>
                {touched.experience && errors.experience && (
                  <FormHelperText>{errors.experience}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box mb={2}>
              <Field name="cv">
                {({ form }: { form: any }) => (
                  <div>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      disabled={!!form.values.cv}
                      color={
                        form.errors.cv && form.touched.cv
                          ? "secondary"
                          : "primary"
                      }
                    >
                      Subir CV
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.docx"
                        onChange={(event) => {
                          const file = event.currentTarget.files
                            ? event.currentTarget.files[0]
                            : null;
                          form.setFieldValue("cv", file);
                        }}
                      />
                    </Button>
                    {form.values.cv && (
                      <Box mt={2} display="flex" alignItems="center">
                        {form.values.cv.type === "application/pdf" ? (
                          <PictureAsPdfIcon style={{ marginRight: 10 }} />
                        ) : (
                          <DescriptionIcon style={{ marginRight: 10 }} />
                        )}
                        <Typography>{form.values.cv.name}</Typography>
                        <IconButton
                          onClick={() => form.setFieldValue("cv", null)}
                          color="secondary"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                    {form.touched.cv && form.errors.cv && (
                      <FormHelperText error>{form.errors.cv}</FormHelperText>
                    )}
                  </div>
                )}
              </Field>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}
