import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import Button from "../../components/form/Button";
import api from "../../api/config";
import { showToast } from "../../helper/toast-utility";
import { useMyLocation } from "../../helper/useMyLocation";
import { XCircle } from "lucide-react";
import Popup from "../../components/layout/Popup";

const SingleClass = () => {
  const { classid } = useParams(); //destructuring krdi {params}
  // console.log(classid, type);
  //ye component jb hum open karege to ye hook merko
  const [classData, setClassData] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchClassByid = async (id) => {
    //function k case mai jb bhi koi cheez dynamic hogi to parameter se ayegi
    try {
      const res = await api.get(`/teacher/classes/${id}`);
      // console.log(res.data);
      setClassData(res.data.class);
    } catch (error) {
      console.log(error);
    }
  };

  // generate QR Session
  const generateQRCode = async (id) => {
    const location = await useMyLocation();
    console.log(location);
    const requestBody = {
      classId: id,
      useMyCurrentLocation: true,
      lat: location.latitutde,
      lng: location.longitude,
    };
    try {
      const res = await api.post("/attendance/sessions", requestBody);
      setSessionDetails(res.data);
      // console.log(res.data);
      showToast("success", "QR Code generated successfully");
    } catch (error) {
      showToast("failed", "Failed to generate QR Code");
      console.log(error);
    }
  };

  const closeSession = async (id) => {
    try {
      await api.patch(`/attendance/sessions/${id}/close`); //response ka koi use hi nhi to sidha await likh diya
      showToast("success", "Session closed successfully");
      setSessionDetails(null);
    } catch (error) {
      showToast("failed", "Failed to close session");
      console.log(error);
    }
  };

  const handleRemoveStudent = async (id, studentId) => {
    try {
      const res = await api.patch(`/teacher/classes/${id}/students/remove `, {
        studentId,
      });
      console.log(res.data);
      fetchClassByid(classid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClassByid(classid);
  }, []);

  return (
    <div className="text-cyan-600 font-semibold">
      <div className="bg-cyan-200 p-8 rounded-md mt-10">
        {classData && (
          <div className="mb-8">
            <h2>{classData.name}</h2>
            {/* {type ==="view" ? view : edit form} */}
            <Button onClick={() => generateQRCode(classData)}>
              Generate QR
            </Button>
          </div>
        )}

        {sessionDetails ? (
          <div className="p-6 bg-cyan-200">
            <p>Session Date: {sessionDetails.session.sessionDate}</p>
            <p>Session Expiry: {sessionDetails.session.expiresAt}</p>
            <img src={sessionDetails.qr.dataUrl} alt="qr"></img>
            <Button onClick={() => closeSession(sessionDetails.session._id)}>
              Close Session
            </Button>
          </div>
        ) : (
          <p>No Active sessions</p>
        )}
      </div>

      <div className="mt-5 text-cyan-600 font-bold">
        Student List:
        {classData ? (
          classData.students.map((student, index) => (
            <div
              className="flex justify-between items-center bg-white text-black mb-1 rounded-md shadow-md mt-2"
              key={student._id}
            >
              <p className="w-1/12 p-2">{index + 1}</p>
              <p className="w-3/12 p-2">{student.name}</p>
              <p className="w-3/12 p-2">{student.email}</p>
              <h1 className="px-2" onClick={() => setShowPopup(true)}>
                <XCircle />
              </h1>
              {showPopup && (
                <Popup onClose={setShowPopup}>
                  <p className="text-cyan-600 p-4">
                    do you want to deactivate this user?{" "}
                  </p>
                  <div className="flex gap-3 items-center justify-end p-4">
                    <Button
                      onClick={() => {
                        handleRemoveStudent(classid, student._id);
                        setShowPopup(false);
                      }}
                    >
                      Yes
                    </Button>
                    <Button onClick={() => setShowPopup(false)}>NO</Button>
                  </div>
                </Popup>
              )}
            </div>
          ))
        ) : (
          <p>No User</p>
        )}
      </div>
    </div>
  );
};
export default SingleClass;
