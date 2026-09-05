import React, { useEffect, useReducer, useState } from "react";
import Button from "../../components/form/Button";
import Popup from "../../components/layout/Popup";
import UserForm from "../../components/form/UserForm";
import api from "../../api/config";
import { Eye, PenSquare, Trash } from "lucide-react";
import { formatDate } from "../../helper";
import { showToast } from "../../helper/toast-utility";

// reducer function has two parametrs - state , action.
// state - it contains current state value.
// action action is an object which has two properties - type and payload. (payload is optional property)
// const reducer = ( state, action )={}

const reducer = (state, action) => { //state - initial humne null di
  // action = {type: "", payload: user}
  switch (action.type) { //action obj k ander type jo hai vo humne di hai case1 mai -"VIEW" 
    case "VIEW": // hum do cheeze bhejre hai isliye obj mai bhejege
      return { contentType: "view", data: action.payload }; // click k time pata lagega kiska data open kr rhe.jo bhi hum return karege in form of obj arr etc vo state mai chla jayega.

    case "EDIT":
      return { contentType: "edit", data: action.payload }; //contentType humne diya hua taki humko pata lage ksipr click hua

    case "DELETE":
      return { contentType: "delete", data: action.payload };

    default:
      return state;
  }
};
// is function mai sb unique naam rakhne hai nd jo data runtime pr chahiye vo payload se ati hai

const Users = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isUserPopup, setIsUserPopup] = useState(false);
  const [usersList, setUsersList] = useState(null);
  const [userType, setUserType] = useState("teacher");

  const [state, dispatch] = useReducer(reducer, null);
  //dispatch method is used to dispatch the action to reduce function.
  //dispatch method will take an object as argument -{type:"", payload:""} payload is optional
  //dispatch ({type:"value", payload:"value"})

  const fetchUsers = async (role = "teacher") => {
    try {
      const response = await api.get(
        `/admin/users?role=${role}`, // jo filter pass karege vo fr vese hi filter hokr ayega
      );
      setUsersList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteUsers = async () => {
  //   try {
  //     const response = await api.patch(
  //       `/admin/users/${state.data._id}/deactivate`,
  //     );
  //     showToast("success", "User deleted successfully");
  //     setUsersList(response.data.users);
  //     // fetchUsers(response.data.user.role);
  //   } catch (error) {
  //     showToast("error", "Failed to delete user");
  //     console.log(error);
  //   }
  // };
  //koi bhi function bana rhe hai hame para lena hai direct value nhi deni hai like above
  // koi bhi fun value use krta hai to direct nhi pass krna dynamic ani chahiye

  const deleteUsers = async (id) => {
    try {
      const response = await api.patch(`/admin/users/${id}/deactivate`);
      showToast("success", "User deleted successfully");
      fetchUsers(response.data.user.role);
      setIsUserPopup(false);
    } catch (error) {
      showToast("error", "Failed to delete user");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="py-10 text-[#0fa8b6] font-bold">
      <div className="flex justify-end ">
        <Button onClick={() => setShowPopup(true)} primary={false}>
          Add User
        </Button>
        {/* humne direct call nhi kr rhe usko humne arrow func k ander diya nd arrow func onclick k ander hai so jbbhi parameter dene ho tb ese krte hai */}
      </div>
      <div className="py-5  ">
        <h1>Users List</h1>
        <div className="flex items-center gap-4">
          <button
            className={`cursor-pointer font-semibold px-4 py-2 rounded-md ${userType === "teacher" ? "text-white bg-[#10a0ad]" : "text-cyan-500 bg-[#cae7f8]"} `}
            onClick={() => {
              (fetchUsers("teacher"), setUserType("teacher"));
            }}
          >
            Teachers
          </button>
          <button
            className={`cursor-pointer font-semibold px-4 py-2 rounded-md ${userType === "student" ? "text-white bg-[#10a0ad]" : "text-cyan-500 bg-[#cae7f8]"} `}
            onClick={() => {
              (fetchUsers("student"), setUserType("student"));
            }}
          >
            Students
          </button>
          {/* <Button onClick={fetchUsers()}>Admin</Button>  means fetchUsers() function ko call krdo without click */}
        </div>
        <div className="py-5">
          <h2 className="mb-4 ">
            {userType === "teacher" ? "Teacher" : "Student"}
          </h2>
          <div>
            {usersList ? (
              usersList.map((user, index) => (
              // usersList.map(({_id, name,email,phone}) => ( but bcoz disaptch mai pura obj hi bhejre to destru nhi use kiya
                <div
                  key={user._id}
                  className="flex justify-between items-center bg-white text-black mb-1 rounded-md shadow-md"
                >
                  <div className="w-1/12 p-2">{index + 1}</div>
                  <div className="w-3/12 p-2">{user.name}</div>
                  <div className="w-3/12 p-2">{user.email}</div>
                  <div className="w-3/12 p-2">{user.phone}</div>
                  <div className="w-2/12 p-2 text-green-600">
                    {user.isActive ? "Active" : "Inactive"}
                  </div>
                  <div className="w-2/12 p-2">Actions</div>
                  <div className="w-3/12 p-2">
                    <button
                      onClick={() => {
                        setIsUserPopup(true);
                        dispatch({ type: "VIEW", payload: user }); //yha humne ye call kiya yha humko action obj pass karna hai ki usko pata kese chalega konsa open krna
                      }}
                      className="px-2"
                    >
                      <Eye />
                    </button>
                    <button
                      onClick={() => {
                        setIsUserPopup(true);
                        dispatch({ type: "EDIT", payload: user });
                      }}
                      className="px-2"
                    >
                      <PenSquare />
                    </button>
                    <button
                      onClick={() => {
                        setIsUserPopup(true);
                        dispatch({ type: "DELETE", payload: user });
                      }}
                      className="px-2 text-red-700"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No User</p>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup onClose={setShowPopup}>
          <UserForm onClose={setShowPopup} fetchUsers={fetchUsers} />
        </Popup>
      )}

      {isUserPopup && (
        <Popup onClose={setIsUserPopup}>
          {state.contentType === "view" ? (
            <div className="p-4">
              <h1>Name: {state.data.name}</h1>
              <h1>Email: {state.data.email}</h1>
              <h1>Phone: {state.data.phone}</h1>
              <h1>Role: {state.data.role}</h1>
              <p>Created At: {formatDate(state.data.createdAt)}</p>
            </div>
          ) : state.contentType === "edit" ? (
            <UserForm
              onClose={setIsUserPopup}
              isUpdate={true}
              data={state.data}
              fetchUsers={fetchUsers}
            />
          ) : (
            <div className="p-4">
              <p>do you want to deactivate this user? </p>
              <div className="flex gap-3 items-center justify-end p-4">
                <Button
                 
                  onClick={() => {
                    deleteUsers(state.data._id);
                  }}
                >Yes</Button>
                <Button>NO</Button>
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
};

export default Users;
