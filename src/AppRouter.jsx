import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Teacher from "./pages/admin/Teacher";
import Student from "./pages/admin/Student";
import Class from "./pages/admin/Class";
import Users from "./pages/admin/Users";

import SingleClass from "./pages/teacher/SingleClass";
import Classes from "./pages/teacher/Classes";
import Students from "./pages/teacher/Students";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import StudentDashboard from "./pages/student/StudentDashboard";
import MarkAttendance from "./pages/student/MarkAttendance";
import MyAttendance from "./pages/student/MyAttendance";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRouter = () => {
  // Iska kaam sirf routing hai.Ye sirf decide karta hai:Kaunsa URL → Kaunsa Component
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      {/* path="/"...Jab URL / ho, tab Home component dikhao. 
      / ka matlab Home component nahi hota. / ka matlab hota hai root URL (website ka starting page).
Tum us root URL par koi bhi component dikha sakti ho*/}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* ProtectedRoute ka kaam hai ki agar user login hai toh hi
        AdminDashboard dikhao, warna login page dikhao. //parent route pr direct
        ProtectedRoute use kiya hai taki uske children route pr bhi ye apply ho
        jaye. */}
        <Route index element={<AdminDashboard />}></Route>
        {/* ye default page jo direct open hoga uske liye hai */}

        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/admin/teacher" element={<Teacher />}></Route>
        <Route path="/admin/student" element={<Student />}></Route>
        <Route path="/admin/class" element={<Class />}></Route>
        {/* ye sb humne children route banaye hai */}
      </Route>

      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />}></Route>
        <Route path="/teacher/class/:classid/" element={<SingleClass />}></Route> 
        {/* humne decalre kr diya ek variable iska humne abhi value nhi di - :classid  to make url dynamic*/}
        <Route path="/teacher/classes" element={<Classes />}></Route>
        <Route path="/teacher/students" element={<Students />}></Route>
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />}></Route>
        <Route path="/student/mark" element={<MarkAttendance />}></Route>
        <Route path="/student/my-attendance" element={<MyAttendance />}></Route>
      </Route>

      <Route path="*" element={<PageNotFound />}></Route>
      {/* (*) ka matlab hota hai jo bhi route match na ho. */}
      {/* iske do main properties hoti hai also hum sb ekhi page mai kr skte the nd browser bhi idher hi use kr skte the */}
    </Routes>
    // Routes + Route → URL aur component ke beech mapping banate hain.
  );
};

export default AppRouter;

// function component
// function
