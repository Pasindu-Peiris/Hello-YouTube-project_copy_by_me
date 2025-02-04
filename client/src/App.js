import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRouters from './utils/ProtectedRouters';
import Notfound from './pages/Notfound';
import Home from './pages/Home';



function App() {

  return (

    <BrowserRouter>

        <Routes>

          <Route path='/' element={<Home/>}/>

          {/* protected routers */}
          <Route element={<ProtectedRouters/>}>
            
          </Route>

          {/* 404 Page Route */}
          <Route path='*' element={<Notfound/>} />
          

        </Routes>

      </BrowserRouter>


  );

}

export default App;
