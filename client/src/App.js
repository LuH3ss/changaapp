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
import PrivateRoute from "./componentes/PrivateRoute/PrivateRoute";
import PublicServices from "./componentes/Settings/ServicePublic";
import UpdateService from "./componentes/Settings/UpdateService/UpdateService";
import Nav from "./componentes/landing/LandingNav";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={[<Nav />, <Landing />, <Footer />]} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/home/services/:id" element={<RequestService />} />
        <Route exact path="/home/createService" element={
        <PrivateRoute>
          <Servicios />
        </PrivateRoute>
        } />
        <Route path="/settings/" element={<Settings />}>
          <Route path="edit" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path='services' element={<PublicServices/>}/>
        </Route>
          <Route path='/settings/updateService/:id' element={<UpdateService/>}/>
        <Route path="/password" element={<Password />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
