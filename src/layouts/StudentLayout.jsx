import React from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { Outlet } from "react-router";

function StudentLayout() {
  const studentRoutes = [
    { url: "/student", linkText: "Dashboard", icon: "user" },
    { url: "/student/mark", linkText: "Mark Attendance", icon: "list-check" },
    {
      url: "/student/my-Attendance",
      linkText: "My Attendance",
      icon: "user-round-arrow-left",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-[180px_1fr] h-screen overflow-hidden">
        <Navbar routes={studentRoutes} />
        <div className="h-screen overflow-y-auto p-4">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
}

export default StudentLayout;
