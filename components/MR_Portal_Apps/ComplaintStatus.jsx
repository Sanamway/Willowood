import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/constants/url";
import moment from "moment";
const ComplaintStatus = () => {
  const [complaints, setComplaints] = useState(null)
  // const complaints = [
  //   {
  //     complaintNo: 1,
  //     date: "02-07-2024",
  //     type: "Quality Related",
  //     complaintDescription: "Straight from Golden Tree",
  //     username: "palak",
  //     role: "regional manager",
  //     BST: "BST",
  //     mobile: 9347823356,
  //     status: "PENDING"
  //   },
  //   {
  //     complaintNo: 2,
  //     date: "21-06-2024",
  //     type: "Quality Related",
  //     complaintDescription: "test",
  //     username: "palak",
  //     role: "regional manager",
  //     BST: "BST",
  //     mobile: 9347823356,
  //     status: "PENDING"
  //   },
  //   {
  //     complaintNo: 3,
  //     date: "09-05-2024",
  //     type: "Quality Related",
  //     complaintDescription: "test",
  //     username: "palak",
  //     role: "regional manager",
  //     BST: "BST",
  //     mobile: 9347823356,
  //     status: "PENDING"
  //   },
  //   {
  //     complaintNo: 4,
  //     date: "12-03-2024",
  //     type: "Quality Related",
  //     complaintDescription: "not good quality",
  //     username: "palak",
  //     role: "Territory manager",
  //     mobile: 9347823356,
  //     BST: "BST",
  //     status: "PENDING"
  //   }
  // ];

  const [userId, setUserId] = useState("");

  const headers = {
    "Content-Type": "application/json",
    secret: "fsdhfgsfuiweifiowefjewcewcebjw"
  };

  useEffect(() => {
    if (window.localStorage) {
      const storedData = window.localStorage.getItem("userinfo");
      const userId = window.localStorage.getItem("uid");
      setUserId(userId);
    }
  }, []);

  const getComplaintData = async () => {
    try {
      const res = await axios.get(`${url}/api/get_serviceticket?c_id=1&user_id=${userId}`, {
        headers: headers
      });
      const resdata = await res.data.data;
      setComplaints(resdata)
      console.log("resdata", resdata);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      getComplaintData();
    }
  }, [userId]);

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        {complaints?.map((complaint, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Complaint Number: {complaint.complaintNo}</h3>
              <span className="bg-yellow-500 text-white text-sm font-bold py-1 px-2 rounded">
                {complaint.status}
              </span>
            </div>
            <div className="text-left">
              <p>Date: {moment(complaint.serv_date).format("DD/MM/Y")}</p>
              <p>Complaint Type: {complaint.priority}</p>
              <p>Complaint Description: {complaint.additional_desc}</p>
              <p>Username: {complaint.username}</p>
              <p>Role: {complaint.role}</p>
              <p>Mobile Number: {complaint.mobile}</p>
              <p>BST: {complaint.BST}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComplaintStatus;
