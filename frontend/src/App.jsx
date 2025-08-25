import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CustomerServices from "./pages/CustomerServices";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerRoute from "./components/OwnerRoute";
import Navbar from "./components/Navbar";
import ManageServices from "./pages/ManageServices";
import ForgotPassword from "./pages/ForgotPassword";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<CustomerServices />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
              path="/owner-dashboard"
              element={
                <OwnerRoute>
                <OwnerDashboard />
                  </OwnerRoute>
                      }
                />  
          <Route
              path="/manage-services"
              element={
                <OwnerRoute>
                <ManageServices />
                  </OwnerRoute>
                    }
                  />
        </Routes>
      </Router>
    </>
    
  )
}

export default App
