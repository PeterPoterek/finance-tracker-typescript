import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./pages/nav/Navbar";
import ErrorPage from "./pages/error/ErrorPage";
import LoadingSpinner from "./pages/loading/LoadingSpinner";

import { ThemeProvider } from "./components/ui/theme-provider";
import { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const UserProfile = lazy(() => import("./pages/account/UserProfile"));
const RequireAuth = lazy(() => import("./pages/protectedRoute/RequireAuth"));
const RedirectIfAuthenticated = lazy(
  () => import("./pages/protectedRoute/RedirectIfAuthenticated")
);

const App = () => {
  const isLoading = useSelector((state: RootState) => state.user.loading);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Router>
            <Navbar />
            <Routes>
              <Route element={<RedirectIfAuthenticated />}>
                <Route path="/" element={<Auth />} />
              </Route>

              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/account" element={<UserProfile />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </Router>
        )}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
