import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
//COMPONENTES PARA LAS RUTAS
import Home from "./componentes/Home/Home";
import Login from "./componentes/Login/Login";
import Register from "./componentes/Register/Register";
import Servicios from "./componentes/Servicios/Servicios";
import EditProfile from "./componentes/Settings/EditProfile";
import Password from "./componentes/ResetPassword/Password";
import Profile from "./componentes/Settings/Profile";
import Settings from "./componentes/Settings/Settings";
import Landing from "./componentes/landing/Landing.jsx";
import RequestService from "./componentes/RequestService/RequestService";
import Footer from "./componentes/Footer";
import Stripe from "./componentes/Stripe";
import PublicServices from "./componentes/Settings/ServicePublic";
import UpdateService from "./componentes/Settings/UpdateService/UpdateService";
import Nav from "./componentes/landing/LandingNav";
import Guardar from "./componentes/Home/Guardar";
import FilterCategory from "./componentes/Home/FiltersCategorys/FilterCategory";
import AllCategorys from "./componentes/Home/FiltersCategorys/AllCategorys";
import StateRequest from "./componentes/Settings/Request/StateRequest";
import StateRequester from "./componentes/Settings/Request/StateOfer";
import Review from "./componentes/Review";

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
        <Route path="/home/todos" element={<AllCategorys />} />
        <Route path="/home/createService" element={<Servicios />} />
        <Route path="/home/services/:id" element={<RequestService />} />
        <Route path="/home/services/payment/:id" element={<Stripe />} />
        <Route path="/home/services/review" element={<Review />} />
        <Route path="/settings/" element={<Settings />}>
          <Route path="edit" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="services" element={<PublicServices />} />
          <Route path='request' element={<StateRequest/>}/>
          <Route path='requester' element={<StateRequester/>}/>
          <Route path="updateService/:id" element={<UpdateService />} />
        </Route>
         
      </Routes>
    </AuthProvider>
  );
}

export default App;
