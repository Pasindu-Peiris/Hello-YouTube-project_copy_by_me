import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../../assets/pagecss/Tasksubtab.css";
import Userdashboard from "./Userdashboard";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tasksubtab = () => {

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
      name: "Channel Link",
      selector: (row) => row.channelLink,
      sortable: true,
    },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Completed Count",
      selector: (row) => row.completedCount,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="">
          {/* Edit button */}
          <button onClick={() => handleEdit(row)} className="buttoncompletetasksub">Complete Task</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {

    toast(
      `We will send you the task page to complete and provide all the instructions on this page,\n\n you can proceed through the instructions.`,
      {
        duration: 3500,
      }
    )

    setTimeout(() => {

      navigate(`/tasksubcomplete/${row.taskSubID}`);
    }, 3500);

  };

  const [tasksub, setTasksub] = useState([]);

  const getAllSubTasks = async () => {

    const userID = localStorage.getItem("user");

    await axios.get(`${apiUrl}/subtasks/get-only-not-done/${userID}`).then((response) => {

      console.log(response.data);
      setTasksub(response.data.task);

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
    getAllSubTasks();
  }, []);

  return (
    <div>
      <Userdashboard />

      <section id="user-dashboard-profile-view">
        <div className="textintasksub">
          <div className="">
            <h1>Subscribe task</h1>
            <p>
              {" "}
              Complete the task using the Complete Task button in front of the
              row{" "}
            </p>
          </div>
        </div>

        <div className="tableintasksub">
          <DataTable
            columns={columns}
            data={tasksub}
            fixedHeader
            fixedHeaderScrollHeight="62vh"
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

export default Tasksubtab;
