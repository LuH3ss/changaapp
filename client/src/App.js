import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './componentes/Home'
import Login from './componentes/Login'
import {AuthProvider} from './context/authContext'
import ServiceDetail from './componentes/ServiceDetail';
//comentario borrar
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/services/:id' element={<ServiceDetail />}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
