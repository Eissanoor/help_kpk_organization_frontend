import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Product from "./pages/tables/Product";
import Requested from "./pages/tables/Requested";
import User from "./pages/tables/Users";
import Completedrequest from "./pages/tables/completedRequest";
import Location from "./pages/tables/location";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/requested" element={<Requested />} />
        <Route path="/user" element={<User />} />
        <Route path="/completedrequest" element={<Completedrequest />} />
        <Route path="/location" element={<Location />} />
        <Route path="*" element={<div className="text-center mt-10 text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
