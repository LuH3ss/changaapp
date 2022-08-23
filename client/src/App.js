import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './componentes/Home'
import Login from './componentes/Login'
import {AuthProvider} from './context/authContext'

import Register from './componentes/Register';

import ServiceDetail from './componentes/ServiceDetail';
import Servicios from './componentes/Servicios';
import RequestService from './componentes/RequestService';


//comentario borrar
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route exact path='/home' element={<Home />}/>
        <Route path='/register' element={<Register/>}/>
        {/* <Route exact path='/home/services/:id'  element={<ServiceDetail />}/> */}
        <Route exact path='/home/createService' element={<Servicios/>}/>
        <Route exact path='/home/services/:id' element={<RequestService />}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
