import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import api from "../../api/config";
import { showToast } from "../../helper/toast-utility";

const UserForm = ({ onClose, isUpdate, data, fetchUsers }) => {
  const init = { name: "", email: "", password: "", role: "" }; // property ki value empty kr rhe hai not the property
  const [formData, setFormData] = useState(init);
  const handleInputs = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/users", formData);
      showToast("success", "User added successfully");
      setFormData(init); //- to make formfield empty
      // onClose(false); - Close the popup after successful user addition error k case mai no need
      fetchUsers(response.data.user.role);
      console.log(response.data);
    } catch (error) {
      showToast("error", "Failed to add user");
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/admin/users/${data._id}`, formData);
      showToast("success", "User added successfully");
      fetchUsers(response.data.user.role);
      onClose(false);
      // console.log(response.data);
    } catch (error) {
      showToast("error", "Failed to add user");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setFormData(data);
    }
  }, [isUpdate]);

  return (
    <>
      <h2 className="text-xl font-semibold text-[#0fa8b6] p-4 ">
        {isUpdate ? "Update" : "Add"} User
      </h2>
      <div className="py-4 p-4">
        <form className="text-black">
          <CustomInput
            label="Name"
            name="name"
            onChange={handleInputs}
            value={formData?.name} // data.email not correct bcoz ye props se ara hai nd vo read-only value hoti hai we cannot make any updates
          />
          <CustomInput
            label="Phone"
            name="phone"
            type="phone"
            onChange={handleInputs}
            value={formData?.phone}
          />
          <CustomInput
              label="Student Id"
              id="studentid"
              name={data.role === "student" ? "studentId" : "employeeId"}
              value={formData?.role === "student" ? formData?.studentId : formData?.employeeId}
              onChange={handleInputs}
            />
          {!isUpdate && (
            <>
              <CustomInput
                label="Email"
                name="email"
                type="email"
                onChange={handleInputs}
                value={formData?.email}
              />

              <CustomInput
                label="Password"
                name="password"
                onChange={handleInputs}
                value={formData?.password}
              />

              <div>
                <select
                  defaultValue={formData?.role}
                  name="role"
                  onChange={handleInputs}
                  className="bg-[#e7f5ff] text-[#0fa8b6] outline-none mb-5"
                >
                  <option selected>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </>
          )}
          {isUpdate ? (
            <Button primary={true} onClick={updateUser}>
              Update User
            </Button>
          ) : (
            <Button primary={true} onClick={addUser}>
              Add User
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default UserForm;

//uncontrolled input in reaaact
