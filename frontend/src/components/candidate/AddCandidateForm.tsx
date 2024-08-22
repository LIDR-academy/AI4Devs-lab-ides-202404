import {
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { addCandidate } from "../../services/api";
import { Candidate } from "../../types/Candidate";
import LoadingButton from "../common/LoadingButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  education: Yup.string().required("Required"),
  experience: Yup.string().required("Required"),
});

const AddCandidateForm: React.FC = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const initialValues: Candidate = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
  };

  const handleSubmit = async (
    values: Candidate,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await addCandidate(values);
      setSnackbar({
        open: true,
        message: "Candidate added successfully!",
        severity: "success",
      });
      resetForm();
    } catch (error: any) {
      console.error("Error adding candidate:", error);
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4">Add New Candidate</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="name"
                  label="Name"
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                  aria-label="Candidate's name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  error={touched.lastName && errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="phone"
                  label="Phone"
                  error={touched.phone && errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="address"
                  label="Address"
                  error={touched.address && errors.address}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="education"
                  label="Education"
                  multiline
                  rows={4}
                  error={touched.education && errors.education}
                  helperText={touched.education && errors.education}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  name="experience"
                  label="Experience"
                  multiline
                  rows={4}
                  error={touched.experience && errors.experience}
                  helperText={touched.experience && errors.experience}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  id="cv-file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("cv", event.currentTarget.files?.[0]);
                  }}
                />
                <label htmlFor="cv-file">
                  <Button variant="contained" component="span">
                    Upload CV
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                >
                  Add Candidate
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCandidateForm;