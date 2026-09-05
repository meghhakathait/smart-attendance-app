import React, { useEffect, useReducer, useState } from "react";
import Button from "../../components/form/Button";
import Popup from "../../components/layout/Popup";
import ClassForm from "../../components/form/ClassForm";
import api from "../../api/config";
import {
  Delete,
  DeleteIcon,
  Edit,
  Eye,
  LucideView,
  Text,
  View,
  ViewIcon,
} from "lucide-react";
import { showToast } from "../../helper/toast-utility";
import { formatDate } from "../../helper";

const reducer = (state, action) => {
  switch (action.type) {
    case "VIEW": 
      return { contentType: "view", data: action.payload };  
    case "EDIT":
      return { contentType: "edit", data: action.payload };

    case "DELETE":
      return { contentType: "delete", data: action.payload };

    default:
      return state;
  }
};

const Class = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClassPopup, setIsClassPopup] = useState(false);
  const [classList, setClassList] = useState(null);

  // useReducer - manage complex state.
  // syntax - const [state,dispatch] = useReducer(reducer, initailValue)
  const [state, dispatch] = useReducer(reducer, null);

  const fetchClass = async (isActive = true) => {
    try {
      const response = await api.get(`/admin/classes?isActive=${isActive}`);
      setClassList(response.data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClass = async (id) => {
    try {
      const response = await api.patch(`/admin/classes/${id}/deactivate`);
      showToast("success", "class deleted successfully");
      fetchClass();
      setIsClassPopup(false);
    } catch (error) {
      showToast("error", "Failed to delete class");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClass();
  }, []);
  return (
    <div className="py-10 text-[#0fa8b6] font-bold">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowPopup(true);
          }}
        >
          Add Class
        </Button>
      </div>
      <div className="py-5 ">
        <h1>Class List</h1>
        <div className="grid grid-cols-4 gap-4 overflow-y-auto">
          {classList ? (
            classList.map((classItem, index) => (
              <div
                key={classItem._id}
                className=" p-5 bg-[#def6ff] text-slate-800  mb-2 rounded-md flex flex-col  shadow-md"
              >
                <div className=" p-2">#{index + 1}</div>
                <div className=" p-2">{classItem.name}</div>
                <div className=" p-2">{classItem.code}</div>
                <div className="flex ">
                  <div className=" p-2">{classItem.location.lat}</div>
                  <div className=" p-2">{classItem.location.lng}</div>
                </div>
                {/* {classItem.schedule.map((sched) => (
                  <div
                    key={sched.day}
                    className=" p-5 bg-slate-700 mb-2 rounded-md flex"
                  >
                    <div className=" p-2">{sched.day}</div>
                    <div className=" p-2">{sched.startTime}</div>
                    <div className=" p-2">{sched.endTime}</div>
                  </div>
                ))} */}

                <div className="flex gap-10">
                  <div className="w-2/12 p-2 text-green-600">
                    {classItem.isActive ? "Active" : "Inactive"}
                  </div>
                  <div className="flex gap-1 ">
                    <button
                      className="text-slate-600 p-0 border-0 shadow-none hover:bg-transparent "
                      onClick={() => {
                        setIsClassPopup(true);
                        dispatch({ type: "VIEW", payload: classItem });
                      }}
                    >
                      <Eye size={22} className="text-black" />
                    </button>

                    <button
                      className=" text-slate-600 p-0 border-0 shadow-none hover:bg-transparent"
                      onClick={() => {
                        setIsClassPopup(true);
                        dispatch({ type: "EDIT", payload: classItem });
                      }}
                    >
                      <Edit size={22} className="text-black"/>
                    </button>
                    <button
                      className="text-slate-600 p-0 border-0 shadow-none hover:bg-transparent"
                      onClick={() => {
                        setIsClassPopup(true);
                        dispatch({ type: "DELETE", payload: classItem });
                      }}
                    >
                      <Delete size={22} className="text-black" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No User</p>
          )}
        </div>
      </div>

      {showPopup && (
        <Popup onClose={setShowPopup}>
          <ClassForm onClose={setShowPopup} fetchClass={fetchClass} />
        </Popup>
      )}

      {isClassPopup && (
        <Popup onClose={setIsClassPopup}>
          {state.contentType === "view" ? (
            <div className="text-black p-4 " >
              <h1>Name: {state.data.name}</h1>
              <h1>Code: {state.data.code}</h1>
              <h1>
                Location: {state.data.location.lat} {state.data.location.lng}
              </h1>
              <h1 className="text-black">
                {state.data.schedule.map((sched) => (
                  <>
                    Day:
                    <span> {sched.day}</span>
                    <h1>
                      Time:
                      <span> {sched.startTime}</span>
                      <span> {sched.endTime}</span>
                    </h1>
                  </>
                ))}
              </h1>
              <h1 >
                Students:
                <div className="flex flex-col">
                {state.data.students.map((stu) => (
                  <h2 className="flex flex-col">
                    {stu.name} {stu.email}
                  </h2>
                ))}
                </div>
              </h1>
              {/* <p>Created At: {formatDate(state.data.createdAt)}</p> */}
            </div>
          ) : state.contentType === "edit" ? (
            <ClassForm
              onClose={setIsClassPopup}
              isUpdate={true}
              data={state.data}
              fetchClass={fetchClass}
            />
          ) : (
            <div className=" p-4">
              <p>do you want to deactivate this class? </p>
              <div className="flex gap-3 items-center justify-end">
                <Button
                  onClick={() => {
                    deleteClass(state.data._id);
                    {
                      setIsClassPopup;
                    }
                  }}
                >
                  YES
                </Button>
                <Button onClose={setIsClassPopup}>NO</Button>
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
};

export default Class;
