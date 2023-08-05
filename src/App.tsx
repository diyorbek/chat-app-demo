import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { DashboardPage } from './pages/dashboard/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>sdsd</div>} />
        <Route path="/active/*" element={<DashboardPage chatType="active" />} />
        <Route
          path="/archived/*"
          element={<DashboardPage chatType="archived" />}
        />
        <Route path="/" element={<Navigate to="/active" />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
