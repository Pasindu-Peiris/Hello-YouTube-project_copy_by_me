import React from "react";
import DataTable from "react-data-table-component";
import { tableData } from "../../utils/Sampledata";
import "../../assets/pagecss/Tasksubtab.css";
import Userdashboard from "./Userdashboard";

const Tasksubtab = () => {
  // Custom styles for table
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
    { name: "Channel Link", selector: (row) => row.channelLink, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "Completed Count", selector: (row) => row.completedCount, sortable: true },
    { name: "Grade", selector: (row) => row.grade, sortable: true },
  ];

  return (
    <div>
      <Userdashboard />

     

      <section id="user-dashboard-profile-view">

        <div className="textintasksub">
        <div className="">
          <h1>Subscribe task</h1>
          <p> Complete the task using the Complete Task button in front of the row </p>
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
                fontSize: "14px",
              },
            },
          ]}
        />
      </div>
      </section>
    </div>
  );
};

export default Tasksubtab;
