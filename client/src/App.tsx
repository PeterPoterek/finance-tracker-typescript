import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import Navbar from "./pages/nav/Navbar";

import { ThemeProvider } from "./components/ui/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/auth" element={<Auth />}></Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
