import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import "../../assets/pagecss/AdminSubTasks.css";
import { useNavigate } from "react-router-dom";
import Admindashboard from "./Admindashboard";


const AdminSubTasks = () => {
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

  const columns = [
    { name: "Channel Link", selector: (row) => row.channelLink, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "Completed Count", selector: (row) => row.completedCount, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row)} className="buttoncompletetasksub">
            Complete Task
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    toast(
      `We will send you the task page to complete and provide all the instructions on this page,\n\n you can proceed through the instructions.`,
      { duration: 3500 }
    );

    setTimeout(() => {
      navigate(`/tasksubcomplete/${row.taskSubID}`);
    }, 3500);
  };

  const handleRowClick = (row) => {
    navigate(`/adminsub/${row.taskSubID}`);
  };

  const [tasksub, setTasksub] = useState([]);

  const getAllSubTasks = async () => {
    try {
      const userID = localStorage.getItem("user");
      const response = await axios.get(`${apiUrl}/subtasks/get-only-not-done/${userID}`);
      console.log(response.data);
      setTasksub(response.data.task);
    } catch (error) {
      console.error("Error fetching subtasks:", error);
      toast.error("Failed to fetch data. Please try again.", {
        duration: 3000,
        style: {
          borderRadius: "10px",
          height: "60px",
          background: "#171617",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    getAllSubTasks();
  }, []);

  return (
    <div className="admin-subtasks">
      {/* Added Admindashboard component */}
      <Admindashboard />

      <h1>Sub Tasks</h1>
      <p>View and manage all subtasks assigned to users.</p>

      <div className="table-container">
        {tasksub.length === 0 ? (
          <p>No subtasks found.</p>
        ) : (
          <DataTable
            columns={columns}
            data={tasksub}
            fixedHeader
            fixedHeaderScrollHeight="62vh"
            pagination
            className="data-table"
            customStyles={customStyles}
            onRowClicked={handleRowClick}
            conditionalRowStyles={[
              {
                when: (row) => row.completedCount > 20, 
                style: {
                  backgroundColor: "#fffdfd",
                  border: "1px solid #1c1a1a",
                  color: "black",
                  fontSize: "16px",
                },
              },
            ]}
          />
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminSubTasks;
