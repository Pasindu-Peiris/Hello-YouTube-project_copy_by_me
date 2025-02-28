import { useState } from "react";
import "../../assets/pagecss/Loginuser.css";
import bg3 from "../../assets/images/adminlog.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${apiUrl}admin/admin-login`, { email, password }).then((response) => {
        console.log(response.data);

        toast.success(response.data.message, {
          duration: 3000,
          style: {
            borderRadius: "10px",
            height: "60px",
            background: "#171617",
            color: "#fff",
          },
        });

        setTimeout(() => {
          navigate("/admin-video-task");
        }, 3000);

        
        localStorage.setItem("user", response.data.admin.id);
        sessionStorage.setItem('role', 'admin'); 
    
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastCallDate", today);

        const now = new Date().getTime(); // Current time in milliseconds
        const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day in milliseconds

        sessionStorage.setItem(
          "isAuth",
          JSON.stringify({
            value: true,
            expiresAt: expirationTime,
          })
        );

      })
      .catch((erro) => {
        toast.error(
            "An error occurred. Please try again.",
          {
            duration: 3000,
            style: {
              borderRadius: "10px",
              height: "60px",
              background: "#171617",
              color: "#fff",
            },
          }
        );
        console.log(erro);
      });
  };

  return (
    <div>
      

      <Header />

      <section id="login">
        <div className="firstlogin">
          <div className="textlogin">
            <h1>Nice to see you again </h1>
            <p>
              Welcome to Hello YouTube Admin Sign In
            </p>
          </div>

          <div className="formlogin">
            <form onSubmit={handleSubmit}>
              <h1>Admin Sign In</h1>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="fogotlogin">
                <a href="/"></a>
              </div>

              <input type="submit" value="Sign In" />
            </form>

            <div className="fogotlogin">
              <p>
              </p>
            </div>
          </div>
        </div>

        <div className="secondlogin">
          <img src={bg3} alt="Promotion visual" />
        </div>
      </section>

      <Toaster position="top-center" reverseOrder={false} />

      <Footer />
    </div>
  )

}

export default Adminlogin