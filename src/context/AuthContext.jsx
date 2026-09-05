import { createContext, useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const local = localStorage.getItem("saauser");
    return local ? JSON.parse(local) : null;
  });

  const userStatus = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
      //data convert hokr ayega
      localStorage.setItem("saauser", JSON.stringify(response.data.user));
    } catch (error) {
      localStorage.removeItem("saauser");
      localStorage.removeItem("saatoken");
      setUser(null);
    }
  };
  useEffect(() => {
    userStatus(); //sbse phle ye function chalega or server pr check hoga ki user login hai ki nhi
  }, []);
  //ye sirf reload pr chalega becoz useEffect use kiya hai or ye sirf ek brr chlta hai isliye reload pr chalega frse ...render pr nhi and first time null hoga kiuki humne login ni kiya then hum login karege nd niche vala login function chlega or data local staorage pr save ho jayega login ka then ab hum reload bhi karege to userStatus frse run hoga and data local storage mai hai ab toh userStatus vala function chlega and server pr check hoga ki user login hai ki nhi

  const login = async (formData) => {
    const response = await api.post("/auth/login", formData);
    localStorage.setItem("saatoken", response.data.token);
    localStorage.setItem("saauser", JSON.stringify(response.data.user));
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    localStorage.removeItem("saatoken");
    localStorage.removeItem("saauser");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  // context ka name. provider
  //  we can pass str value="hello" nd if multiple data pass krna hai value={{}} we can use obj
};

export default AuthContext;
