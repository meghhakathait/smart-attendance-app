// import React, { useState } from "react";
// import CustomInput from "../components/form/CustomInput";
// import Button from "../components/form/Button";
// import api from "../api/config";
// import { useNavigate } from "react-router";

// // hooks top level function prhi declare hote hai joki component
// const Login = () => {
//   const navigate = useNavigate();
//   //jaha bhi redirection laganai laga skte
//   const [formData, setFormData] = useState(null);
//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/auth/login", formData);
//       localStorage.setItem("saatoken", response.data.token);
//       localStorage.setItem("saauser", JSON.stringify(response.data.user));
//       navigate("/admin");
//       // console.log("Login successful:", response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // number and string ko convert krne ki need nhi hoti vha samj aa jata hai usko but agr array or obj ho tb need hoti hai

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   const option = {
//   //       method: "POST",
//   //       headers:{
//   //           "Content-Type":"application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //   };
//   //   const response =  await fetch("http://localhost:5000/api/auth/login", option );
//   //   const data = await response.json();
//   //   console.log(data);
//   // };

//   return (
//     <div className="border border-mauve-400 bg-mauve-700 p-5 rounded-2xl">
//       <form>
//         <h1 className="text-3xl font-bold"></h1>
//         <div className="py-4">
//           {/* <CustomInput label="Email" name="email" type="email" disabled={true} /> */}
//           <CustomInput
//             label="Email"
//             name="email"
//             type="email"
//             onChange={handleInput}
//           />
//           <CustomInput
//             label="Password"
//             name="password"
//             type="password"
//             onChange={handleInput}
//           />
//         </div>
//         <Button onClick={handleLogin}>Login</Button>
//       </form>
//     </div>
//   );
// };

// export default Login;
