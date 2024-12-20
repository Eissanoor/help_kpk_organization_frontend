import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard"
import Product from "./pages/Product/Product";
import Requested from "./pages/Requested/Requested";
import User from "./pages/Users/Users";
import Completedrequest from "./pages/completedRequest/completedRequest";
import Location from "./pages/Location/location";
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
