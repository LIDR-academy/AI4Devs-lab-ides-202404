import { Grid } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
