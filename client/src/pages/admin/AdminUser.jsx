import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import "../../assets/pagecss/AdminSubTasks.css";
import { useNavigate } from "react-router-dom";
import Admindashboard from "./Admindashboard";

const AdminUser = () => {

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
        cells: {
            style: {
                fontSize: "14px",
                color: "#333",
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
            name: "Username",
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                row.status === "active" ?
                <button
                    className="buttoncompletetasksubtaskonechannle buttoncompletetasksubtaskone"
                >
                    Active
                </button>
                :
                <button
                    
                    className="buttoncompletetasksubtaskonechannle buttoncompletetasksubtaskone"
                    style={{ backgroundColor: "green" }}
                >
                    Inactive
                </button>

            ),
            sortable: true,
        },
        {
            name: "Registration Date",
            selector: (row) => formatDateToYYYYMMDD(row.registrationDate),
            sortable: true,
        },
    ];

    const formatDateToYYYYMMDD = (isoDateString) => {
        const date = new Date(isoDateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };



    const [tasksub, setTasksub] = useState([]);

    const getAllSubTasks = async () => {

        await axios.get(`${apiUrl}/user/getall-user`).then((response) => {
            console.log(response.data.users);
            setTasksub(response.data.users);

            console.log(tasksub);
        })
            .catch((error) => {
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
            });
    };

    useEffect(() => {
        getAllSubTasks();
    }, []);

    return (
        <div className="admin-subtasks">
            <Admindashboard />

            <div className="admin-content-wrapper">
                <h1>User Details</h1>
                <p>View and manage all users.</p>

                <section id="tasksubtabaddurl3">
                    <div className="tableintasksubaddurl" id="newadminsubtask3">
                        <DataTable
                            columns={columns}
                            data={tasksub}
                            fixedHeader
                            fixedHeaderScrollHeight="66vh"
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
            </div>

            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default AdminUser;
