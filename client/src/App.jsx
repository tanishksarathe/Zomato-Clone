import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from 'react-hot-toast';
import UserDashboard from "./pages/Dashboards/UserDashboard";
import RestaurantDashboard from "./pages/Dashboards/RestaurantDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import RiderDashboard from "./pages/Dashboards/RiderDashboard";
import RestaurantPage from "./pages/RestaurantPage";
import RestaurantHeader from "./components/restaurantPageInsiders/RestaurantHeader";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster/>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurants-all" element={<RestaurantPage />} />
          <Route path="/restaurant-header/:id" element={<RestaurantHeader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
