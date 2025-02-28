import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Linkupload.css";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Header from "../../components/Header"; // Import Header
import linkUploadImage from "../../assets/images/Mobup.svg";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Linkupload = () => {

  const apiUrl = process.env.REACT_APP_API_URL; // Use API URL from .env
  const id = localStorage.getItem("user");

  const [link, setLink] = useState('')

  const navigate = useNavigate();

  const isValidYouTubeUrl = (url) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(channel\/|c\/|@)[a-zA-Z0-9_-]+)/;
    return regex.test(url);
};


  const handleSubmit = async (e) => {

    e.preventDefault();
    alert(link)

    const test = isValidYouTubeUrl(link);

    if(test === true){

      await axios.post(`${apiUrl}subtasks/add-sub/${id}`,{
        channelLink: link,
        description: "none_des",
      }).then((response) => {

        toast.success("Successfully uploaded!", {
          duration: 3000,
          style: { borderRadius: "10px",
          height: "60px",
          background: "#171617",
          color: "#fff" },
        });

        setTimeout(() => {
          navigate("/signin"); // Redirect to the sign-in page after 3 seconds
        }, 3000);

      }).catch((error) => {
        toast.error("Internal Server Error !", {
          duration: 3000,
          style: { borderRadius: "10px",
          height: "60px",
          background: "#171617",
          color: "#fff" },
        });

      })

    }else{
      toast.error("Enter a valid YouTube URL", {
        duration: 3000,
        style: { borderRadius: "10px",
          height: "60px",
          background: "#171617",
          color: "#fff" },
      });

    }


  }

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
                  onChange={(e) => {
                    setLink(e.target.value)
                  }}
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
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default Linkupload;
