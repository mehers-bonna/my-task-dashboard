import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/dashboard" element={<div>Dashboard Coming Soon...</div>} />
      </Routes>
    </Router>
  );
}

export default App;