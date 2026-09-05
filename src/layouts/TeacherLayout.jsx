import React from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { Outlet } from "react-router";

function TeacherLayout() {
  const teacherRoutes = [
    { url: "/teacher", linkText: "Dashboard", icon: "user-star" },
    { url: "/teacher/classes", linkText: "Classes", icon: "notebook-pen" },
    { url: "/teacher/students", linkText: "Students", icon: "users" },
  ];
  return (
    <>
      <div className="grid grid-cols-[180px_1fr] h-screen overflow-hidden">
        <Navbar routes={teacherRoutes} />
        <div className="h-screen overflow-y-auto p-4">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
}

export default TeacherLayout;
