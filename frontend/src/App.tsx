import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./views/Landing/Landing";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/ltiTheme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
