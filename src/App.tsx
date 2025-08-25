import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import { LoginPage } from "./pages/login/LoginPage";
import { SuccessPage } from "./pages/success/SuccessPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
