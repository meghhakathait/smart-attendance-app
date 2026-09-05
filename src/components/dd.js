// import React, { useEffect, useState } from "react";
// import Container from "./Container";
// import CustomNavLink from "./CustomNavLink";
// import { Link, useNavigate } from "react-router";

// function Navbar({ routes }) {
//   const navigate = useNavigate();

//   const [showDropdown, setShowDropdown] = useState(false);

//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     let localdata = JSON.parse(localStorage.getItem("saauser"));
//     //getItem mai sirf key use krte nd vha se string ki form mai ayega to obj mai convert krna padega
//     if (localdata) {
//       setUser(localdata);
//     }
//   }, []);
//   // dependency mai vo value dete jo uske chnge hone pr chalana ho br br
//   //useEffect hum jb component k load hote hi hame kuch dikhana ho tb use krte hai
//   // state update krte hai vo currently available nhi hai next render pr available hota hai usko handle krne k liye conditional rendering ka use kr skte

//   const logout = () => {
//     localStorage.removeItem("saatoken");
//     localStorage.removeItem("saauser");
//     navigate("/");
//   };

//   const handleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//   };
//   //kisi logic mai previous value use hori to prev use krna sidha stateVariable nhi
//   return (
//     <div className="bg-mauve-900 ">
//       <Container>
//         <div className="flex items-center justify-between">
//           <Link to="/">Smart Attendance</Link>
//           {/* <div>Smart Attendance</div> */}
//           <div className="flex items-center">
//             {/* <Link to="/">Home</Link> --YE for links we not using anchor tag bcoz we cannot use its all property */}
//             {routes.map((route) => (
//               <CustomNavLink key={route.url} to={route.url} icon={route.icon}>
//                 {route.linkText}
//               </CustomNavLink>
//             ))}
//             {/* <span>{user?.name}</span> */}
//             {/* {user ? <span>{user.name}</span> : <span>User</span>} */}
//             {/* {user && <span>{user.name}</span>} */}

//             <div className="relative">
//               <button onClick={handleDropdown} className="cursor-pointer">
//                 {user ? user.name : "Guest"}
//               </button>
//               {showDropdown && (
//                 <div className="absolute right-0  bg-mauve-950 w-3xs top-10 flex flex-col items-end">
//                   <Link
//                     className="px-3 py-5 border-b border-b-mauve-800 w-full text-right"
//                     to="/help"
//                   >
//                     Help
//                   </Link>
//                   <button
//                     className="px-3 py-4 border-b border-b-mauve-800 w-full text-right"
//                     onClick={logout}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Navbar;

// // props drilling we pass props in multiple components like pass in granparent then parent component then child then its child nd further.
