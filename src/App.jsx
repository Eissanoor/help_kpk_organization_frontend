import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard"
import Product from "./pages/Product/Product";
import Requested from "./pages/Requesteddisable/Requesteddisable";
import RequestedMember from "./pages/RequestedMember/RequestedMember";
import RequestedSchool from "./pages/RequestedSchool/RequestedSchool";
import User from "./pages/Users/Users";
import Completedrequest from "./pages/completedRequest/completedRequest";
import Location from "./pages/Location/location";
import CreateNewUser from "./pages/Users/CreateNewUser";
import CreateNewProduct from "./pages/Product/CreateNewProduct";
import UpdateProduct from "./pages/Product/updateProduct";
import ViewProduct from "./pages/Product/ViewProduct"
import ViewUser from "./pages/Users/viewUser";
import UpdateUser from "./pages/Users/updateUser";
import CreateNewLocation from "./pages/Location/CreateNewLocation";
import ViewLocation from "./pages/Location/ViewLocation";
import UpdateLocation from "./pages/Location/updateLocation";
function App() {
  return (
    <SidebarProvider>
      <Router>
        <div className="flex">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  <Sidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/product" element={<Product />} />
                      <Route path="/requested" element={<Requested />} />
                      <Route path="/requestedmember" element={<RequestedMember />} />
                      <Route path="/requestedschool" element={<RequestedSchool />} />
                      <Route path="/user" element={<User />} />
                      <Route path="/completedrequest" element={<Completedrequest />} />
                      <Route path="/location" element={<Location />} />
                      <Route path="/create-new-user" element={<CreateNewUser />} />
                      <Route path="/create-new-product" element={<CreateNewProduct />} />
                      <Route path="/view-product" element={<ViewProduct />} />
                      <Route path="/update-product" element={<UpdateProduct />} />
                      <Route path="/view-user" element={<ViewUser />} />
                      <Route path="/update-user" element={<UpdateUser />} />
                      <Route path="/view-location" element={<ViewLocation />} />
                      <Route path="/update-location" element={<UpdateLocation />} />
                      <Route path="/create-new-location" element={<CreateNewLocation />} />
                      <Route path="*" element={<div className="text-center mt-10 text-2xl">404 - Page Not Found</div>} />
                    </Routes>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </SidebarProvider>
  );
}

export default App;
