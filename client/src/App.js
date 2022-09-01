/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
//COMPONENTES PARA LAS RUTAS
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";
import Servicios from "./componentes/Servicios/Servicios";
import EditProfile from "./componentes/Settings/EditProfile";
import Password from "./componentes/ResetPassword/Password";
import Profile from "./componentes/Settings/Profile";
import Settings from "./componentes/Settings/Settings";
import Landing from "./componentes/landing/Landing.jsx";
import RequestService from "./componentes/RequestService/RequestService";
import Stripe from "./componentes/Stripe";
import PublicServices from "./componentes/Settings/ServicePublic";
import UpdateService from "./componentes/Settings/UpdateService/UpdateService";
import Guardar from "./componentes/Home/Guardar";
import FilterCategory from "./componentes/Home/FiltersCategorys/FilterCategory";
import AllCategorys from "./componentes/Home/FiltersCategorys/AllCategorys";
import StateRequest from "./componentes/Settings/Request/StateRequest";
import StateRequester from "./componentes/Settings/Request/StateOfer";

import PreService from "./componentes/Home/RenderProfile/PreService";
import PublicProfile from "./componentes/Home/RenderProfile/PublicProfile";
import Notifications from "./componentes/Settings/Notifications";

import Admin from "./componentes/admin/Admin";


import Adminnavbar from "./componentes/admin/Admin-navbar";
import Users from "./componentes/admin/Users";
import Categories from "./componentes/admin/Categories";
import CreateCategory from "./componentes/admin/CreateCategory";
import PrivateRoute from "./componentes/PrivateRoute/PrivateRoute";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/home" element={<Guardar />} />
        <Route path="/home/:name" element={<FilterCategory />} />
        <Route path='/home/user/:id' element={<PreService/>}/>
        <Route path='/home/public/:id' element={<PublicProfile/>}/>
        <Route path="/home/todos" element={<AllCategorys />} />
        <Route path="/home/createService" element={<Servicios />} />
        <Route path="/home/services/:id" element={<RequestService />} />
        <Route path="/home/services/payment/:id" element={<Stripe />} />
        <Route path="/settings/" element={<Settings />}>
          <Route path="edit" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="services" element={<PublicServices />} />
          <Route path="request" element={<StateRequest />} />
          <Route path="requester" element={<StateRequester />} />
          <Route path="updateService/:id" element={<UpdateService />} />
          <Route path='notifications' element={<Notifications/>}/>
        </Route>

        <Route path="/admin/" element={<PrivateRoute><Adminnavbar/></PrivateRoute>} >
          <Route path="users" element={<PrivateRoute><Users/></PrivateRoute>} />  
          <Route path="categories" element={<PrivateRoute><Categories/></PrivateRoute>} />  
          <Route path="createCategory" element={<PrivateRoute><CreateCategory/></PrivateRoute>} />
        </Route> 
        {/* <Route path='/admin' element={<PrivateRoute><Adminnavbar/></PrivateRoute>}/> */}

      </Routes>
    </AuthProvider>
  );
}

export default App;
