import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { showToast } from "../../helper/toast-utility";
import api from "../../api/config";
import Button from "./Button";
import { X } from "lucide-react";

const ClassForm = ({ isUpdate, data, fetchClass, onClose }) => {
  const init = { name: "", code: "", location: { lat: "", lng: "" } }; //Because later tum directly classData.location.lat etc. use kar sakogi.
  const [classData, setClassData] = useState(init);
  const [studentList, setStudentList] = useState(null);
  const [teacherList, setTeacherList] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleClassData = (e) => {
    let { name, value } = e.target;
    setClassData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocation = (e) => {
    let { name, value } = e.target;
    setClassData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: Number(value) },
    }));
  };

  const addClass = async (e) => {
    e.preventDefault();
    let requestData = { ...classData, schedule };
    // agr obj k ander property ka naam bhi same hai jo backend mai hai or jo humne var banaya vo bhi same hai to hum sidha naam likh skte like-schedule:schedule or like aboove
    try {
      const response = await api.post("/admin/classes", requestData);
      showToast("success", "Class added successfully");
      onClose(false);
      fetchClass();
      console.log(response.data);
    } catch (error) {
      showToast("error", "Failed to add Class");
      console.log(error);
    }
  };

  // add students to class
  const addStudentToClass = async (id, studentId) => {
    //classid nd studentid jisko add krna
    try {
      await api.patch(`/admin/classes/${id}/students/add`, { studentId });
      showToast("success", "Student added to class!");
    } catch (error) {
      showToast("error", "Failed to add student");
      console.log(error);
    }
  };

  const fetchStudents = async (role = "student", isActive = true) => {
    //ismai humko active hi chahiye sirf
    try {
      const response = await api.get(
        `/admin/users?role=${role}&isActive=${isActive}`,
      );
      setStudentList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // add teachers to class
  const addTeacherToClass = async (id, teacherId) => {
    try {
      await api.patch(`/admin/classes/${id}/assign-teacher`, { teacherId });
      showToast("success", "Teacher added to class!");
    } catch (error) {
      showToast("error", "Failed to add teacher");
      console.log(error);
    }
  };

  const fetchTeachers = async (role = "teacher", isActive = true) => {
    try {
      const response = await api.get(
        `/admin/users?role=${role}&isActive=${isActive}`,
      );
      setTeacherList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const days = [
    { value: "MON", text: "Monday" },
    { value: "Tue", text: "Tuesday" },
    { value: "Wed", text: "Wednesday" },
    { value: "Thru", text: "Thrusday" },
    { value: "Fri", text: "Friday" },
    { value: "Sat", text: "Saturday" },
    { value: "Sun", text: "Sunday" },
  ];

  //[{day:"", startTime:"" , endTime=""}]
  const dayInit = { day: "Mon", startTime: "09:00", endTime: "10:30" };
  const [schedule, setSchedule] = useState([dayInit]);

  const addNewScheduleItem = (e) => {
    e.preventDefault();
    if (schedule.length < 7) {
      setSchedule((prev) => [...prev, dayInit]);
    }
  };

  const handleSchedule = (i, name, value) => {
    const arr = [...schedule]; //humne phle default value le aye nd then humne update kiya
    //arr[index] = value; - to assign value
    //arr[i] -to get value
    arr[i] = { ...arr[i], [name]: value };
    //spread operator se sari current value aa gyi or [name]:value se jo new hum assign karege or ye sb fr arr[i] to asign krdi
    setSchedule(arr);
  };
  //

  const updateClass = async (e) => {
    e.preventDefault();
    let requestData = { ...classData, schedule };
    try {
      const response = await api.put(`/admin/classes/${data._id}`, requestData);
      showToast("success", "Class updated successfully");
      fetchClass();
      onClose(false);
      // console.log(response.data);
    } catch (error) {
      showToast("error", "Failed to update class");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdate && data) {
      fetchStudents();
      fetchTeachers();
      setClassData(data);
      setSchedule(data.schedule || [dayInit]);
    }
  }, [isUpdate]);

  return (
    <>
      <div className="">
        <form className="py-4 p-4 max-h-120 overflow-auto">
          <h2 className="text-xl font-semibold pb-4">
            {isUpdate ? "Update" : "Add"} Class
          </h2>
          <CustomInput
            label="Name"
            name="name"
            onChange={handleClassData}
            value={classData?.name}
          />
          <CustomInput label="Code" name="code" onChange={handleClassData} />
          <h1>Location</h1>
          <div className="flex gap-2 items-center justify-center text-gray-600">
            <CustomInput
              placeholder="Latitude"
              name="lat"
              onChange={handleLocation}
              value={classData?.location?.lat}
            />
            <CustomInput
              placeholder="Longitude"
              name="lng"
              onChange={handleLocation}
              value={classData?.location?.lng}
            />
          </div>

          <div className="flex flex-col ">
            {schedule.map((sched, i) => (
              <div
                key={i}
                className="flex gap-3 items-center"
              >
                <select
                  value={sched.day}
                  // name="day"
                  className=" bg-[#e7f5ff]"
                  onChange={(e) => handleSchedule(i, "day", e.target.value)} //arguments
                  //value - update kr skte hai value or onchange pr func laga hona chahiye sth hi
                >
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.text}
                    </option>
                  ))}
                </select>
                <div className="ms-auto flex gap-3 items-center">
                  <CustomInput
                    type="time"
                    // name="startTime" - bcoz ab hum argument k trhough pass kr hi rhe hai
                    value={sched.startTime}
                    onChange={(e) =>
                      handleSchedule(i, "startTime", e.target.value)
                    }
                  />
                  <CustomInput
                    type="time"
                    // name="endTime"
                    value={sched.endTime}
                    onChange={(e) =>
                      handleSchedule(i, "endTime", e.target.value)
                    }
                  />
                </div>
                
                <div className=" flex  ">
                  <button
                    onClick={() => onClose(false)}
                    className="p-4 cursor-pointer bg-[#d9effc] shadow-md h-10"
                  >
                    <X size={20} />
                  </button>
                  {/* humko khud decide krna hai design dekhkr ki kya use hoga like ismai array of objects use hoge kiuki days k ander unki properties bhi hai  */}
                </div>
              </div>
            ))}
            <Button onClick={addNewScheduleItem}>Add Schedule</Button>

            {isUpdate ? (
              <Button primary={true} onClick={updateClass}>
                Update Class
              </Button>
            ) : (
              <Button primary={true} onClick={addClass}>
                Add Class
              </Button>
            )}

            {/* Select student to Add */}
            <div className="py-5">
              {studentList && (
                <select
                  className=" "
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                  }}
                >
                  {studentList.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              )}

              <Button
                type="button"
                onClick={() => addStudentToClass(data._id, selectedStudent)}
              >
                Add Student
              </Button>
            </div>

            {/* Select teacher to Add */}
            <div className="py-5">
              {teacherList && (
                <select
                  className=" "
                  onChange={(e) => {
                    addTeacherToClass(data._id, e.target.value);
                    //multiple teachers nhi select kr skte isliye ese hi kr skte do parameter pass karege class id joki data k ander hai nd teacherId jo bhi teacher select karege uska to .value se aa jayegi
                  }}
                >
                  {teacherList.map(({_id, name}) => ( //ye confirm hona chahiye ki obj hi ayega kisi or datatype mai nhi
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
              )}

            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ClassForm;
