import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Linkupload.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../../components/Header"; // Import Header
import linkUploadImage from "../../assets/images/Mobup.svg";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Linkupload = () => {
  const apiUrl = process.env.REACT_APP_API_URL; // Use API URL from .env
  const apiKey = process.env.REACT_APP_API_KEY; // Use API key from .env (if needed)
  const [userprof, setUserprof] = useState(null);
  const [user, setUser] = useState({ url: "" });
  const [istaskIn, setIstaskIn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      const id = localStorage.getItem("user");

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${apiKey}`, // If API key is required for authorization
          },
        };
        const res = await axios.get(`${apiUrl}user/get-user/${id}`, config);
        setUserprof(res.data.user);

        if (
          !res.data.user.taskSub ||
          Object.keys(res.data.user.taskSub).length === 0 ||
          (Array.isArray(res.data.user.taskSub) && res.data.user.taskSub.length === 0)
        ) {
          setIstaskIn(false);
          toast("First time login. Please add your YouTube channel link.", { duration: 6000 });
        }
      } catch (error) {
        toast.error("Internal server error", {
          duration: 3000,
          style: { borderRadius: "10px", background: "#171617", color: "#fff" },
        });
      }
    };
    getUserDetails();
  }, [apiUrl, apiKey]);

  const isValidYouTubeUrl = (url) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUser({ url: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the URL when clicking the Start your promotion button
    if (!isValidYouTubeUrl(user.url)) {
      toast.error("Enter a valid YouTube URL", {
        duration: 3000,
        style: { borderRadius: "10px", background: "#171617", color: "#fff" },
      });
      return;
    }

    // If valid, submit the form and navigate to the sign-in page
    toast.success("Successfully uploaded!", {
      duration: 3000,
      style: { borderRadius: "10px", background: "#171617", color: "#fff" },
    });

    setTimeout(() => {
      navigate("/signin"); // Redirect to the sign-in page after 3 seconds
    }, 3000);
  };

  return (
    <div>
      <Header />

      <div id="linkuploadmain">
        <div className="linkuploadtextsection">
          <div className="firstloginlinkuploadtextsection">
            <div className="textloginlinkuploadtextsection">
              <h1>Upload Channel Link</h1>
              <p>
                Upload your YouTube Channel link here to <br /> continue the registration process.
              </p>
            </div>

            <div className="formloginlinkuploadtextsection">
              <form onSubmit={handleSubmit}>
                <h1>Upload</h1>
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="Enter Channel Link"
                  required
                  onChange={handleInputChange}
                />

                <input type="submit" value="Upload" />
              </form>
            </div>
          </div>
        </div>

        <div className="imagelinkuploadhome">
          <img src={linkUploadImage} alt="Link Upload" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Linkupload;
