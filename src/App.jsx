import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* login page */}
        <Route path="/" element={<LoginPage />} />
        
        {/* dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* for wrong url */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;