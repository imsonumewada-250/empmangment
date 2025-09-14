import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EmployeePage from "./components/employee/EmployeePage";

import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";  

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <EmployeePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>

      {/* ✅ ToastContainer at top-level */}
      <ToastContainer
        position="top-right"
        autoClose={1000}       // 1 second me hide
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}

export default App;
