import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./src/Context/SidebarContext.jsx";
import Sidebar from "./src/components/Sidebar.jsx";
import Home from "./src/pages/Home/Home.jsx";
import Login from "./src/pages/Login/Login.jsx";
import Register from "./src/pages/Register/Register.jsx";
import Dashboard from "./src/pages/Dashboard/Dashboard.jsx"
import Product from "./src/pages/Product/Product.jsx";
import Requested from "./src/pages/Requesteddisable/Requesteddisable.jsx";
import RequestedMember from "./src/pages/RequestedMember/RequestedMember.jsx";
import RequestedSchool from "./src/pages/RequestedSchool/RequestedSchool.jsx";
import User from "./src/pages/Users/Users.jsx";
import Completedrequest from "./src/pages/completedRequest/completedRequest.jsx";
import Location from "./src/pages/Location/location.jsx";
import CreateNewUser from "./src/pages/Users/CreateNewUser.jsx";
import CreateNewProduct from "./src/pages/Product/CreateNewProduct.jsx";
import UpdateProduct from "./src/pages/Product/updateProduct.jsx";
import ViewProduct from "./src/pages/Product/ViewProduct.jsx"
import ViewUser from "./src/pages/Users/viewUser.jsx";
import UpdateUser from "./src/pages/Users/updateUser.jsx";
import CreateNewLocation from "./src/pages/Location/CreateNewLocation.jsx";
import ViewLocation from "./src/pages/Location/ViewLocation.jsx";
import UpdateLocation from "./src/pages/Location/updateLocation.jsx";
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
