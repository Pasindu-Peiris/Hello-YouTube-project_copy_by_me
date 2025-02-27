import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "../../assets/pagecss/Taskone.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";


const Taskone = () => {

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    // State to track selected files and link clicks per taskSubID
    const [selectedFiles, setSelectedFiles] = useState({});
    const [linkClicks, setLinkClicks] = useState({});

    const customStyles = {
        headCells: {
          style: {
            backgroundColor: "#25242b",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
          },
        },
      };

    // Columns definition
    const columns = [
        {
            name: "#",
            cell: (row, rowIndex) => <div>{rowIndex + 1}</div>,
            width: "50px",
        },
        {
            name: "Channel Link",
            cell: (row) => (
                <button
                    onClick={() => navigateYoutube(row.channelLink, row.taskSubID)}
                    className="buttoncompletetasksubtaskonechannle buttoncompletetasksubtaskone"
                >
                    Channel URL
                </button>
            ),
        },
        {
            name: "Upload",
            cell: (row) => (
                <div className="rowuploadtaskone">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpload(row.taskSubID);
                        }}
                        className="formtaskone"
                    >
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, row.taskSubID)}
                            accept="image/*"
                        />
                        <input
                            type="submit"
                            value="Submit"
                            disabled={!selectedFiles[row.taskSubID]}
                            className="buttoncompletetasksubtaskone"
                        />
                    </form>
                </div>
            ),
        },
    ];

    // Handle file input change
    const handleFileChange = (event, taskSubID) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFiles(prev => ({ ...prev, [taskSubID]: file }));
        }
    };

    // Handle channel link click
    const navigateYoutube = (linkUp, taskSubID) => {
        window.open(linkUp, '_blank');
        setLinkClicks(prev => ({ ...prev, [taskSubID]: true }));
    };

    // Handle form submission
    const handleUpload = async (taskSubID) => {
        if (!linkClicks[taskSubID]) {
            toast.error("Please visit the channel link first!");
            return;
        }

        const file = selectedFiles[taskSubID];
        if (!file) {
            toast.error("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("proofLink", file);
        formData.append("userID", localStorage.getItem("user"));

        try {
            const res = await axios.post(
                `${apiUrl}/completed-sub/create-completesub/${taskSubID}`,
                formData
            );

            toast.success(res.data.message);
            await updateCompletedSub(taskSubID);

            setTimeout(() => {
               window.location.reload();
            }, 2000);

        } catch (err) {
            toast.error(err.response?.data?.message || "Upload failed");
        }
    };



    //get all task for user
    const [tasksub, setTasksub] = useState([]);

    const getAllSubTasks = async () => {

        const userID = localStorage.getItem("user");
        let counttaskSub = localStorage.getItem("subTask");

        await axios.get(`${apiUrl}/subtasks/get-only-not-done/${userID}`).then((response) => {

            console.log(response.data);
            const first20Tasks = response.data.task.slice(0, JSON.parse(counttaskSub).value);

            setTasksub(first20Tasks);

            if(JSON.parse(counttaskSub).value === 0){
                toast((t) => (
                    <span className="toast-tasktwo">
                      <p> Your task is completed, you can now proceed to the next task after 24HR</p>
                    </span>
                  ),{
                    position:"top-center",
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                  });

                setTimeout(() => {
                    navigate("/user-dashboard");
                }, 5000);    
            }


        }).catch((error) => {
            console.log(error);
            toast.error("Failed to fetch data. Please try again.", {
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    height: "60px",
                    background: "#171617",
                    color: "#fff",
                },
            });
        })


    };



    useEffect(() => {
        getAllSubTasks(); // Call the function if it was not called today
    }, []);


    console.log(tasksub);

    const updateLocalSubTask = () => {

        const now = new Date().getTime(); // Current time in milliseconds
        const expirationTime = now + 24 * 60 * 60 * 1000; // 1 day in milliseconds

        let counttaskSubGet = localStorage.getItem("subTask");

        let newCount = JSON.parse(counttaskSubGet).value - 1;

        localStorage.setItem("subTask",
          JSON.stringify({
            value:newCount,
            expiresAt: expirationTime,
          }))

    }


    const updateCompletedSub = async (taskSubID) => {

        await axios.put(`${apiUrl}subtasks/update-completedcount/${taskSubID}`).then((res) => {
            console.log('don complete count')
            updateLocalSubTask()
        }).catch((err) => {
            console.log(err)
        })


    }

    return (
        <div id="headtaskone">
            <div className="backbuttontaskone">
                <button
                    onClick={() => {
                        navigate("/user-dashboard");
                    }}
                    className="buttoncompletetasksubtaskone"
                >
                    Back
                </button>
            </div>
            <div id="taskone">

                <section id="taskonecontent">
                    <div className="tableintasksubtaskone">
                        <DataTable
                            title="Subscribe task"
                            columns={columns}
                            data={tasksub} // Use tasksub state instead of tableData
                            fixedHeader
                            fixedHeaderScrollHeight="70vh"
                            className="data-table"
                            customStyles={customStyles}
                            responsive // Enable responsive behavior
                            conditionalRowStyles={[
                                {
                                    when: (row) => row.channelLink && row.channelLink.length > 20,
                                    style: {
                                        backgroundColor: "#fffdfd",
                                        border: "1px solidrgba(28, 26, 26, 0.26)",
                                        color: "black",
                                        fontSize: "16px",
                                    },
                                },
                            ]}
                        />
                    </div>
                </section>

                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default Taskone;
