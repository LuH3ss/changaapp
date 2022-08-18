import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './componentes/Home'
import Login from './componentes/Login'
import {AuthProvider} from './context/authContext'
import Register from './componentes/Register';
//comentario borrar
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
