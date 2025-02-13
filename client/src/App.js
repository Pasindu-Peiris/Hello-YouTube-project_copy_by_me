import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRouters from './utils/ProtectedRouters';
import Notfound from './pages/Notfound';
import Home from './pages/Home';
import Loginuser from './pages/user/Loginuser';
import Registration from './pages/user/Registration';
import Userdashboard from './pages/user/Userdashboard';
import Subadd from './pages/user/Subadd';


function App() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Loginuser />} />
        <Route path='/signup' element={<Registration />} />



        {/* protected routers */}
        <Route element={<ProtectedRouters />}>
        
          <Route path='/user-dashboard' element={<Userdashboard />} />
          <Route path='/dash' element={<Subadd />} />

        </Route>

        {/* 404 Page Route */}
        <Route path='*' element={<Notfound />} />


      </Routes>

    </BrowserRouter>


  );
}

export default App;
