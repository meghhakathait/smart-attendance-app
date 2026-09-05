import React from "react";
import { NavLink } from "react-router";
import { DynamicIcon } from "lucide-react/dynamic";

function CustomNavLink({to, children, icon}) {
  return (
    <>
      <NavLink
      end
        className={({ isActive }) =>
          `py-3 px-4 mt-3 flex gap-1 items-center  ${isActive ? "text-white" : "text-mauve-300"}`
        }
        to={to}
      >
        <DynamicIcon name={icon}/>
        {children}
      </NavLink>
    </>
  );
}

export default CustomNavLink;

//children ek special prop hai jo opening aur closing tag ke beech ka content automatically receive karta hai.
// Anchor Tag - HTML element used for navigation. It reloads the entire page when navigating to another URL.
// Link - React Router component used for navigation without reloading the page.
// NavLink - A special version of Link that provides information about whether the link is currently active, allowing active styling.

//isActive mai back mai phle se ye hota hai ki jo url browser mai ayega usko match krna true hai tb active show hoga nd 