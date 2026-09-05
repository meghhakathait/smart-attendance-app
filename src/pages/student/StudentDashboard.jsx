import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Button from "../../components/form/Button";

function StudentDashboard() {
  const [timeTable, setTimeTable] = useState(null);
  const fetchTimeTable = async () => {
    try {
      const res = await api.get("/student/timetable");
      // console.log(res.data);
      setTimeTable(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);

  return (
    <div className="text-cyan-600 font-semibold">
      {timeTable ? (
        <>
          <h2>{timeTable.today}</h2>
          {timeTable.classes.length > 0 ? (
            timeTable.classes.map((classItem) => (
              <div
                key={classItem.classId}
                className="flex items-center mb-4 roounded-md p-2 bg-cyan-200"
              >
                <div className="w-3/12">{classItem.name}</div>
                <div className="w-3/12">{classItem.code}</div>
                <div className="w-3/12">{classItem.teacher.name}</div>
                <div className="w-3/12">
                  {classItem.liveSessionId === null ? (
                    <span
                      className="w-3 h-3 rounded-full block border-2
                     border-emerald-800"
                    ></span>
                  ) : (
                    <span
                      className="w-3 h-3 rounded-full animate-ping block border-2
                     border-red-800"
                    ></span>
                  )}
                </div>
                <div className="w-2/12">
                  <Button>Mark Attendance</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No classes for today</p>
          )}
        </>
      ) : (
        <p>No classes today</p>
      )}
    </div>
  );
}

export default StudentDashboard;
