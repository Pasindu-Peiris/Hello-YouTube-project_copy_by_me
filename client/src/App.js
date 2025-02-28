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

function App() {
  return (


    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Loginuser />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/link" element={<Linkupload />} />

        <Route path="/admin-login-url-only-client" element={<Adminlogin/>} />


        <Route element={<ProtectedRouters allowedRoles={['admin']} />}>
          <Route path="/admin-video-task" element={<AdminSubTasks />} />
          <Route path="/admin-users" element={<AdminUser />} />
          <Route path="/admin-sub-task" element={<AdminVideoTasks />} />
        </Route>


        <Route element={<ProtectedRouters allowedRoles={['user']} />}>
          <Route path="/user-dashboard" element={<UserDashboardClient />} />
          <Route path="/taskone" element={<Taskone />} />
          <Route path="/tasktwo" element={<Tasktwo />} />
          <Route path="/addurl" element={<Addurl />} />
        </Route>

        {/* 404 පිටුව */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
