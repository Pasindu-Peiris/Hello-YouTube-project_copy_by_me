import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRouters from "./utils/ProtectedRouters";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import Loginuser from "./pages/user/Loginuser";
import Registration from "./pages/user/Registration";
import Subadd from "./pages/user/Subadd";
import Subtask from "./pages/user/Subtask";
import Tasksubtab from "./pages/user/Tasksubtab";
import Tasksubupload from "./pages/user/Tasksubupload";
import UserDashboardClient from "./pages/user/UserDashboardClient";
import Linkupload from "./pages/user/Linkupload";
import Admindashboard from "./pages/admin/Admindashboard";
import AdminSubTasks from "./pages/admin/AdminSubTasks";
import Taskone from "./pages/user/Taskone";
import Tasktwo from "./pages/user/Tasktwo";
import Addurl from "./pages/user/Addurl";
import AdminUser from "./pages/admin/AdminUser";
import AdminVideoTasks from "./pages/admin/AdminVideoTasks";

function App() {
  return (


    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Loginuser />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/link" element={<Linkupload/>}/>

        <Route path="/admin" element={<Admindashboard/>}/>
        <Route path="/admin-video-task" element={<AdminSubTasks/>}/>
        <Route path="/admin-users" element={<AdminUser/>}/>
        <Route path="/admin-sub-task" element={<AdminVideoTasks/>}/>

        {/* protected routers */}
        <Route element={<ProtectedRouters />}>

          <Route path="/user-dashboard" element={<UserDashboardClient/>} />
          <Route path="/taskone" element={<Taskone/>} />
          <Route path="/tasktwo" element={<Tasktwo/>} />
          <Route path="/addurl" element={<Addurl/>} />





          <Route path="/user-dashboard-old" element={<Subadd />} />
          <Route path="/subscription" element={<Subtask />} />
          <Route path="/tasksubscription" element={<Tasksubtab />} />
          <Route path="/tasksubcomplete/:taskSubID" element={<Tasksubupload />} />

        </Route>

        {/* 404 Page Route */}
        <Route path="*" element={<Notfound />} />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
