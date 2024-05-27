import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
