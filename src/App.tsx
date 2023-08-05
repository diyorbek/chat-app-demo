import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthToken } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { DashboardPage } from './pages/dashboard/DashboardPage';

// TODO: implement better route protecting mechanism
function App() {
  const { token } = useAuthToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/active/*"
          element={
            token ? (
              <DashboardPage chatType="active" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/archived/*"
          element={
            token ? (
              <DashboardPage chatType="archived" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={token ? <Navigate to="/active" /> : <Navigate to="/login" />}
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
