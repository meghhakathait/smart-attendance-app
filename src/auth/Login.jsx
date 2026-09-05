import React, { useContext, useState } from "react";
import CustomInput from "../components/form/CustomInput";
import Button from "../components/form/Button";
import api from "../api/config";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import { showToast } from "../helper/toast-utility";

// hooks top level function prhi declare hote hai joki component
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  //jaha bhi redirection laganai laga skte
  const [formData, setFormData] = useState(null);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let userData = await login(formData);
      //function call krdiya- login(formData)
      //nd await isliye use kiya taki login function complete ho jaye then navigate hoga
      // console.log(userData);
      showToast("success", "Login successful");
      if (userData.role === "admin") {
        navigate("/admin");
      } else if (userData.role === "teacher") {
        navigate("/teacher");
      } else if (userData.role === "student") {
        navigate("/student");
      }
    } catch (error) {
      showToast("error", "Login failed");
      console.log(error);
    }
  };
  return (
    <div className="border border-slate-400 bg-slate-700 p-5 rounded-2xl">
      <form>
        <h1 className="text-3xl font-bold"></h1>
        <div className="py-4">
          {/* <CustomInput label="Email" name="email" type="email" disabled={true} /> */}
          <CustomInput
            label="Email"
            name="email"
            type="email"
            onChange={handleInput}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            onChange={handleInput}
          />
        </div>
        <Button onClick={handleLogin} primary={true}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
