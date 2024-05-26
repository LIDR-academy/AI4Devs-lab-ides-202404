import { Grid, Paper, Typography } from "@mui/material";
import AddCandidateForm from "../../components/AddCandidateForm/AddCandidateForm";

export default function Landing() {
  return (
    <Grid container sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" align="center" mb={2}>
            Inscribirme a la oferta
          </Typography>
          <AddCandidateForm />
        </Paper>
      </Grid>
    </Grid>
  );
}
