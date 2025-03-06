import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRouters from "./utils/ProtectedRouters";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Loginuser from "./pages/user/Loginuser";
import Registration from "./pages/user/Registration";
import UserDashboardClient from "./pages/user/UserDashboardClient";
import Linkupload from "./pages/user/Linkupload";
import AdminSubTasks from "./pages/admin/AdminSubTasks";
import Taskone from "./pages/user/Taskone";
import Tasktwo from "./pages/user/Tasktwo";
import Addurl from "./pages/user/Addurl";
import AdminUser from "./pages/admin/AdminUser";
import AdminVideoTasks from "./pages/admin/AdminVideoTasks";
import Adminlogin from "./pages/admin/Adminlogin";
import Contactus from "./pages/Contactus";
import Privacypolicy from "./pages/Privacypolicy";
import Termsandconditions from "./pages/Termsandconditions";
import Aboutus from "./pages/Aboutus";
import Timecounter from "./pages/user/Timecounter";
import AdminContactus from "./pages/admin/AdminContactus";

function App() {
  return (


    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Loginuser />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/link" element={<Linkupload />} />
        <Route path="/contact-us" element={<Contactus/>}/> 
        <Route path="/about-us" element={<Aboutus/>}/>
        <Route path="/privacy-policy" element={<Privacypolicy/>}/>
        <Route path="/Terms-and-conditions" element={<Termsandconditions/>}/>

        <Route path="/time" element={<Timecounter/>}/>

        <Route path="/admin-login-url-only-client" element={<Adminlogin/>} />


        <Route element={<ProtectedRouters allowedRoles={['admin']} />}>
          <Route path="/admin-video-task" element={<AdminSubTasks />} />
          <Route path="/admin-users" element={<AdminUser />} />
          <Route path="/admin-sub-task" element={<AdminVideoTasks />} />
          <Route path="/admin-contact-us" element={<AdminContactus/>}/>
        </Route>


        <Route element={<ProtectedRouters allowedRoles={['user']} />}>
          <Route path="/user-dashboard" element={<UserDashboardClient />} />
          <Route path="/taskone" element={<Taskone />} />
          <Route path="/tasktwo" element={<Tasktwo />} />
          <Route path="/addurl" element={<Addurl />} />
        </Route>

        
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
