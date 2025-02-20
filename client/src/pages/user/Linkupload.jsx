import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Linkupload.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../../components/Header"; // Import Header
import linkUploadImage from "../../assets/images/Mobup.svg";
import Footer from "../../components/Footer";

const Linkupload = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [userprof, setUserprof] = useState(null);
  const [user, setUser] = useState({ url: "" });
  const [istaskIn, setistaskIn] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      const id = localStorage.getItem("user");

      try {
        const res = await axios.get(`${apiUrl}user/get-user/${id}`);
        setUserprof(res.data.user);

        if (
          !res.data.user.taskSub ||
          Object.keys(res.data.user.taskSub).length === 0 ||
          (Array.isArray(res.data.user.taskSub) && res.data.user.taskSub.length === 0)
        ) {
          setistaskIn(false);
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
  }, [apiUrl]);

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

    const id = istaskIn ? userprof.taskSub.taskSubID : localStorage.getItem("user");
    const endpoint = istaskIn ? `update-subtask/${id}` : `add-sub/${id}`;
    const method = istaskIn ? axios.put : axios.post;

    try {
      await method(`${apiUrl}subtasks/${endpoint}`, { channelLink: user.url });

      toast.success(`Successfully ${istaskIn ? "updated" : "created"}!`, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#171617", color: "#fff" },
      });
    } catch (error) {
      toast.error(`Failed to ${istaskIn ? "update" : "create"}. Please try again.`, {
        duration: 3000,
        style: { borderRadius: "10px", background: "#171617", color: "#fff" },
      });
    }
  };

  return (

      <div>

        <Header/>

        <div id="linkuploadmain">

          <div className="linkuploadtextsection">

            <div className="firstloginlinkuploadtextsection">
              <div className="textloginlinkuploadtextsection">
                <h1>Upload  channel Link </h1>
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

        <Footer/>

      </div>
  );
};

export default Linkupload;