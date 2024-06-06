// import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";

import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import Navbar from "./pages/nav/Navbar";
import ErrorPage from "./pages/error/ErrorPage";
import LoadingSpinner from "./pages/loading/LoadingSpinner";
import UserProfile from "./pages/account/UserProfile";
import RequireAuth from "./pages/protectedRoute/RequireAuth";
import { ThemeProvider } from "./components/ui/theme-provider";

const App = () => {
  const isLoading = useSelector((state: RootState) => state.loading);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/account" element={<UserProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
      {isLoading && <LoadingSpinner />}
    </ThemeProvider>
  );
};

export default App;
