import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const VehiclesFeature = lazy(() => import("../features/vehicles"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/vehicles" replace />} />
    <Route path="/vehicles" element={<VehiclesFeature />} />
    <Route path="*" element={<Navigate to="/vehicles" replace />} />
  </Routes>
);

export default AppRoutes;