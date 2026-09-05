import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();
  console.log(location);

  if (!user) {
    return <Navigate to="/" />;
  }
  if (role !== user.role) {
    return <Navigate to="/" state={{ from: location }} />; //state mai obj hota hai nd ye hame basically phle konsi jegh the vo batata but vo  location useLocation mai store hota hai
  }

  return children;
};

export default ProtectedRoute;
//ProtectedRoute ka kaam hai ki agar user login hai toh hi AdminDashboard dikhao, warna login page dikhao.
//return means
