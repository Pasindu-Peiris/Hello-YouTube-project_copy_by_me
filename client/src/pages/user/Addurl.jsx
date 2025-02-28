import React, { useEffect, useState } from "react";
import "../../assets/pagecss/Addurl.css";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import DataTable from "react-data-table-component";

const Addurl = () => {
    const userId = localStorage.getItem("user");

    console.log(userId);

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#25242b",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
    };

    // Columns
    const columns = [
        {
            name: "#",
            cell: (row, rowIndex) => <div>{rowIndex + 1}</div>,
            width: "50px",
        },
        {
            name: "Channel Link",
            selector: (row) => row.videoLink,
            cell: (row) => (
                <button
                    onClick={() => navigateYoutube(row.videoLink, row.taskSubID)}
                    className="buttoncompletetasksubtaskonechannle buttoncompletetasksubtaskone"
                >
                    Channel URL
                </button>
            ),
            sortable: true,
        },

        {
            name: "Completed Count",
            selector: (row) => row.completedCount,
            sortable: true,
        },

        {
            name: "Created Date",
            selector: (row) => formatDateToYYYYMMDD(row.createdDate),
            sortable: true
        },
    ];

    // Handle channel link click
    const navigateYoutube = (linkUp, taskSubID) => {
        window.open(linkUp, '_blank');
    };


    const [tasksub, setTasksub] = useState([]);

    const getAllSubTasks = async () => {

        const userID = localStorage.getItem("user");

        await axios.get(`${apiUrl}/videos/get-by-id/${userID}`).then((response) => {

            console.log(response.data);
            setTasksub(response.data.videos);

            console.log(tasksub)

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

    const formatDateToYYYYMMDD = (isoDateString) => {

        const date = new Date(isoDateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");


        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getAllSubTasks();
    }, []);


    const validateYouTubeLink = (link) => {
        // YouTube link pattern
        const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;

        // Check if the link matches the pattern
        return youtubePattern.test(link);
    };


    const [link, setLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userID = localStorage.getItem("user");

        if (validateYouTubeLink(link) === true) {


            axios.post(`${apiUrl}/videos/add-video/${userID}`, { videoLink: link }).then((response) => {

                if (response.data.success === false) {
                    toast.error(response.data.message, {
                        duration: 3000,
                        style: {
                            borderRadius: "10px",
                            height: "60px",
                            background: "#171617",
                            color: "#fff",
                        },
                    });

                } else {
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
                        getAllSubTasks();
                        setLink('')
                    }, 3001);
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


        } else {

            toast.error("Enter valid URL.", {
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    height: "60px",
                    background: "#171617",
                    color: "#fff",
                },
            });

        }




    }


    return (
        <div id="addurl">

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

            <div className="formaddurl">

                <form onSubmit={handleSubmit}>
                    <input type="url" id="url" value={link} placeholder="Enter Video URL" onChange={(e) => {
                        setLink(e.target.value);
                    }} />
                    <input type="submit" value="ADD URL" />
                </form>

            </div>


            <section id="tasksubtabaddurl2">
                <div className="tableintasksubaddurl">
                    <DataTable
                        columns={columns}
                        data={tasksub}
                        fixedHeader
                        fixedHeaderScrollHeight="56vh"
                        pagination
                        className="data-table"
                        customStyles={customStyles}
                        conditionalRowStyles={[
                            {
                                when: (row) => row.channelLink > 20,
                                style: {
                                    backgroundColor: "#fffdfd",
                                    border: "1px solid #1c1a1a",
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
    );
};

export default Addurl;
