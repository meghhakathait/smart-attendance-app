import React, { useEffect, useState } from "react";
import Container from "./Container";
import CustomNavLink from "./CustomNavLink";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar({ routes }) {
  const { user, logout } = useContext(AuthContext);
  // console.log(data.user)
  // obj se humne direct vo property nikl li destructuring se  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  //kisi logic mai previous value use hori to prev use krna sidha stateVariable nhi
  return (
    <div className="bg-cyan-800 h-screen  ">
      <Container>
        <div className="h-screen flex flex-col ">
          <Link to="/" className="p-4 font-medium whitespace-nowrap ">
            <img src={logo} alt="Smart Attendance" className="w-56"></img>
          </Link>
          {/* <div>Smart Attendance</div> */}
          <div className="flex flex-col flex-1 items-start pt-4">
            {routes.map((route) => (
              <CustomNavLink key={route.url} to={route.url} icon={route.icon}>
                {route.linkText}
              </CustomNavLink>
            ))}

            <div className="relative mt-auto pb-5 w-full">
              <button onClick={handleDropdown} className="cursor-pointer">
                {user ? user.name : "Guest"}
              </button>
              {showDropdown && (
                <div className="absolute bottom-full left-0 mb-2 bg-slate-700 w-36 rounded-md shadow-lg overflow-hidden">
                  <Link
                    className="px-3 py-3 border-b border-slate-500 w-full block"
                    to="/help"
                  >
                    Help
                  </Link>
                  <button
                    className="px-3 py-3 w-full text-left"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;

// props drilling we pass props in multiple components like pass in granparent then parent component then child then its child nd further.
