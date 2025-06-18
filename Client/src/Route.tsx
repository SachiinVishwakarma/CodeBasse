// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Challenges from './components/Challenges';
function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;
