import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./pages/nav/Navbar";
import ErrorPage from "./pages/error/ErrorPage";
import LoadingSpinner from "./pages/loading/LoadingSpinner";

import { ThemeProvider } from "./components/ui/theme-provider";
// import { RootState } from "./redux/store/store";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const UserProfile = lazy(() => import("./pages/account/UserProfile"));
const RequireAuth = lazy(() => import("./pages/protectedRoute/RequireAuth"));
const RedirectIfAuthenticated = lazy(
  () => import("./pages/protectedRoute/RedirectIfAuthenticated")
);

const App = () => {
  // const isLoading = useSelector((state: RootState) => state.loading);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<RedirectIfAuthenticated />}>
              <Route path="/" element={<Auth />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<UserProfile />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
