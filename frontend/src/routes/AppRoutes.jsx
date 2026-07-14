import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import HCP from "../pages/HCP";
import Interaction from "../pages/Interaction";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hcps" element={<HCP />} />
        <Route path="/interactions" element={<Interaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;