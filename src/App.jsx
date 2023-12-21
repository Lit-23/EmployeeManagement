import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./assets/mui components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import EmployeeLogin from "./authentication/EmployeeLogin";
import AdminLogin from "./authentication/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import AdminProfile from "./pages/AdminProfile";
import EmployeeProfile from "./pages/EmployeeProfile";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/employee-login" element={<EmployeeLogin />}/>
        <Route path="/admin-login" element={<AdminLogin />}/>
        
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};