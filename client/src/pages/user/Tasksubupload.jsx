import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/pagecss/Tasksubupload.css";
import { Toaster, toast } from "react-hot-toast";

const Tasksubupload = () => {

  const { taskid } = useParams();

  const apiUrl = process.env.REACT_APP_API_URL;

  console.log(taskid);


  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Set the image preview URL
      };
      reader.readAsDataURL(file);
      setSelectedFile(file); // Save the selected file
    }
  };


  // Handle form submission
  const handleUpload = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedFile) {
      // Perform the upload logic here (e.g., send the file to a server)
      console.log("Uploading file:", selectedFile.name);
      alert(`File "${selectedFile.name}" uploaded successfully!`);

    } else {
      toast.error("Please select a file first!", {
        duration: 3000,
        style: {
          borderRadius: "10px",
          height: "60px",
          background: "#171617",
          fontFamily: "Poppins",
          color: "#fff",
        },
      });
    
    }
  };

  const deleteImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
   
  }

  const navigateBack = () => {

    toast.error('Task Process will be Cancel ', {
      duration: 3000,
      style: {
        borderRadius: "10px",
        height: "60px",
        background: "#171617",
        fontFamily: "Poppins",
        color: "#fff",
      },
    });

    setTimeout(() => {

      navigate('/tasksub')
    }, 2000);



  }

  return (

    <div id="Tasksubupload">

      <div className="Tasksubupload1">

        <div className="tasksubuploadtext">
          <button onClick={() => { navigateBack() }}>BACK</button>
          <h1>Step guide lines </h1>

          <ul>
            <li>Visite YouTube Channel using the link.  <a href="!#">Channel Link</a> </li>
            <li>Subscribe the channel and get screenshot as  proof of subscription</li>
            <li>Upload the screenshots in the given image upload area and click the upload button.</li>
            <li>The system will notify you with a message once the screenshot has been successfully uploaded.</li>
            <li>Cancel this process by clicking the Back button at the top of the page.</li>
          </ul>


        </div>

      </div>

      <div className="Tasksubupload2">



        <form onSubmit={handleUpload} className="containerTasksubupload">
          <div className="headerTasksubupload">

            <p>Browse File to upload!</p>
            {/* Image Preview */}
            {imagePreview && (
              <div className="imagePreview">
                <img src={imagePreview} alt="Uploaded" />
              </div>
            )}
          </div>
          <label htmlFor="file" className="footerTasksubupload">
            <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M15.331 6H8.5v20h15V14.154h-8.169z" stroke="#000000"></path>
                <path d="M18.153 6h-.009v5.342H23.5v-.002z" stroke="#000000"></path>
              </g>
            </svg>
            <p>{selectedFile ? selectedFile.name : "Not selected file"}</p>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => { deleteImage() }}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                  stroke="#000000"
                  strokeWidth="2"
                ></path>
                <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
                <path
                  d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                  stroke="#000000"
                  strokeWidth="2"
                ></path>
              </g>
            </svg>
          </label>
          <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
          <input type="submit" value="Upload" className="uploadButton" />
        </form>


      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>


  )
};

export default Tasksubupload;


