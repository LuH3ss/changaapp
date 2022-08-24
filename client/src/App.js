import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./componentes/Home/Home";
import Login from "./componentes/Login/Login";
import { AuthProvider } from "./context/authContext";

import Register from "./componentes/Register/Register";

import ServiceDetail from "./componentes/ServiceDetail";
import Servicios from "./componentes/Servicios/Servicios";
import EditProfile from "./componentes/Settings/EditProfile";
import Password from "./componentes/Settings/Password";
import Profile from "./componentes/Settings/Profile";
import Settings from "./componentes/Settings/Settings";

//comentario borrar
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/home/services/:id" element={<ServiceDetail />} />
        <Route exact path="/home/createService" element={<Servicios />} />
        <Route path="/settings/" element={<Settings />}>
          <Route path="edit" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route exact path="/password" element={<Password />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
