import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Container from "../components/Container";

function AdminLayout() {
  const adminRoutes = [
    { url: "/admin", linkText: "Dashboard", icon: "gauge" },
    { url: "/admin/users", linkText: "Users", icon: "gauge" },
    { url: "/admin/teacher", linkText: "Teacher", icon: "user-star" },
    { url: "/admin/student", linkText: "Student", icon: "users" },
    { url: "/admin/class", linkText: "Class", icon: "notebook-pen" },
  ];
  return (
    <>
      <div className="grid grid-cols-[180px_1fr] h-screen overflow-hidden">
        <Navbar routes={adminRoutes} />
        <div className="h-screen overflow-y-auto p-4">
          <Container>
            <Outlet />
            {/* child root vale components show krta hai jaha bhi use krege */}
          </Container>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;

// AdminLayout admin section ka common structure hai, aur AdminDashboard us structure ke andar dikhne wala pehla page hai.

// Layout = Common Structure
//         (Navbar + Sidebar + Outlet)

// Page = Actual Screen
//        (Dashboard, Teachers, Students, etc.)
// Isliye professional React projects me route pe generally Layout render hota hai, aur Layout ke andar alag-alag pages (Dashboard, Students, Teachers) Outlet ke through render hote hain. Ye approach code ko clean aur reusable banati hai.
