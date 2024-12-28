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
import CreateNewUser from "./pages/Users/CreateNewUser";
import CreateNewProduct from "./pages/Product/CreateNewProduct";
import UpdateProduct from "./pages/Product/updateProduct";
import ViewProduct from "./pages/Product/ViewProduct"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/requested" element={<Requested />} />
        <Route path="/user" element={<User />} />
        <Route path="/completedrequest" element={<Completedrequest />} />
        <Route path="/location" element={<Location />} />
        <Route path="/create-new-user" element={<CreateNewUser />} />
        <Route path="/create-new-product" element={<CreateNewProduct />} />
        <Route path="/view-product" element={<ViewProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="*" element={<div className="text-center mt-10 text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
