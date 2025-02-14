import React from "react";
import DataTable from "react-data-table-component";
import { tableData } from "../../utils/Sampledata";
import "../../assets/pagecss/Tasksubtab.css";
import Userdashboard from "./Userdashboard";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Tasksubtab = () => {

  const navigate = useNavigate();
 
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

    toast.success(`Editing student: ${row.channelLink}`, {
      duration: 3000,
      style: {
        borderRadius: "10px",
        height: "60px",
        background: "#171617",
        color: "#fff",
      },
    });

    setTimeout(() => {
      
      navigate(`/tasksubcomplete/${row.channelLink}`);
    }, 2000);

    
  };

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
            data={tableData}
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
