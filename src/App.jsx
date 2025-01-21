import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./Context/SidebarContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Product from "./pages/Product/Product.jsx";
import Requested from "./pages/Requesteddisable/Requesteddisable.jsx";
import RequestedMember from "./pages/RequestedMember/RequestedMember.jsx";
import RequestedSchool from "./pages/RequestedSchool/RequestedSchool.jsx";
import User from "./pages/Users/Users.jsx";
import Completedrequest from "./pages/completedRequest/completedRequest.jsx";
import Location from "./pages/Location/location.jsx";
import CreateNewUser from "./pages/Users/CreateNewUser.jsx";
import CreateNewProduct from "./pages/Product/CreateNewProduct.jsx";
import UpdateProduct from "./pages/Product/updateProduct.jsx";
import ViewProduct from "./pages/Product/ViewProduct.jsx"
import ViewUser from "./pages/Users/viewUser.jsx";
import UpdateUser from "./pages/Users/updateUser.jsx";
import CreateNewLocation from "./pages/Location/CreateNewLocation.jsx";
import ViewLocation from "./pages/Location/ViewLocation.jsx";
import UpdateLocation from "./pages/Location/updateLocation.jsx";
import Profile from "./pages/profile/profile.jsx";
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
                      <Route path="/profile" element={<Profile />} />
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
