import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import  LandingPage from './Components/LandingPage';
import  Signup from './Components/Signup';
import LoginPage from './Components/LoginPage';
// import FeaturesPage from './Components/FeaturesPage';
import FeaturesPage from './Components/FeaturesPage';
import Contact from './Components/Contact';
import Dashboard from './Components/Dashboard';
import FlowerSelection from './Components/FlowerSelection';
import CartPage from './Components/CartPage';
import Eventsdashboard from './Components/Eventsdashboard';
import CreateEvent from './Components/CreateEvent';
import Events from './Components/Events';
import DeleteEvents from './Components/DeleteEvents';
import UpdateEvent from './Components/UpdateEvent';
import LoginButton from './Components/LoginButton';
import LogoutButton from './Components/LogoutButton';
import BudgetForm from './Components/BudgetForm';
import BudgetChart from './Components/BudgetChart';
import VendorDashboard from './Components/VendorDashboard';
import Vendorlist from './Components/Vendorlist';
import AddVendorForm from './Components/AddVendorForm';
import UpdateVendor from './Components/UpdateVendor';
import DeleteVendor from './Components/DeleteVendor';
import ScheduleDashboard from './Components/ScheduleDashboard';
import AddSchedule from './Components/AddSchedule';
import ScheduleList from './Components/ScheduleList';
import DeleteSchedule from './Components/DeleteSchedule';
import UpdateSchedule from './Components/UpdateSchedule';
import CheckoutPage from './Components/CheckoutPage';
import OrderConfirmation from './Components/OrderConfirmation';
import SuggestionsPage from './Components/Suggestion';
export default function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} /> 
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/features" element={<FeaturesPage/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/flowerselection" element={<FlowerSelection/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/eventsdashboard" element={<Eventsdashboard/>} />
        <Route path="/createevent" element={<CreateEvent/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/deleteevents" element={<DeleteEvents/>} />
        <Route path="/updateevent" element={<UpdateEvent/>} />
        <Route path="/loginbutton" element={<LoginButton/>} />
        <Route path="/logoutbutton" element={<LogoutButton/>} />
        <Route path="/budget" element={<BudgetForm/>} />
        <Route path="/allbudgets"element={<BudgetChart/>} />
        <Route path="/vendordashboard" element={<VendorDashboard/>} />
        <Route path="/vendorlist" element={<Vendorlist/>} />
        <Route path="/addvendor" element={<AddVendorForm/>} />
        <Route path="/updatevendor" element={<UpdateVendor/>} />
        <Route path="/deletevendor" element={<DeleteVendor/>} />
        <Route path="/Scheduledashboard" element={<ScheduleDashboard/>} />
        <Route path="/addschedule" element={<AddSchedule/>} />
        <Route path="/schedulelist" element={<ScheduleList/>} />
        <Route path="/deleteschedule" element={<DeleteSchedule/>} />
        <Route path="/updateschedule" element={<UpdateSchedule/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/orderconfirmation" element={<OrderConfirmation/>} />
        <Route path="/suggestions" element={<SuggestionsPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
