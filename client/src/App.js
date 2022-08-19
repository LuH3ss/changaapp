import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './componentes/Home'
import Login from './componentes/Login'
import {AuthProvider} from './context/authContext'

import Register from './componentes/Register';

import ServiceDetail from './componentes/ServiceDetail';

//comentario borrar
function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route exact path='/' element={<Login />}/>
        <Route exact path='/home' element={<Home />}/>
        <Route path='/register' element={<Register/>}/>
        <Route exact path='/home/services/:id'  element={<ServiceDetail />}/>

      </Routes>
    </AuthProvider>
  );
}

export default App;
