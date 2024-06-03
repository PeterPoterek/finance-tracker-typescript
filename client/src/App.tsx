import { Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import Navbar from "./pages/nav/Navbar";
import ErrorPage from "./pages/error/ErrorPage";
import LoadingSpinner from "./pages/loading/LoadingSpinner";
import UserProfile from "./pages/account/UserProfile";

import { ThemeProvider } from "./components/ui/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/account" element={<UserProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
