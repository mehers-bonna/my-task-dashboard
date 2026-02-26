import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <BrowserRouter>
      <Routes>
        {/* login page */}
        <Route path="/" element={<LoginPage />} />
        
        {/* if user had token then user will be enter dashboard */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
        />

        {/* for incorrect url */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;