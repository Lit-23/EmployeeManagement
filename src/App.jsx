import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import EmployeeLogin from "./authentication/EmployeeLogin";
import AdminLogin from "./authentication/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/employee-login" element={<EmployeeLogin />}/>
          <Route path="/admin-login" element={<AdminLogin />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};