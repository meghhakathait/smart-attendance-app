import React, { useState } from "react";
import api from "../../api/config";
import { useEffect } from "react";
import { Link } from "react-router";

const Classes = () => {
  const [classList, setClassesList] = useState(null);

  const fetchClasses = async () => {
    try {
      const response = await api.get(`/teacher/classes`);
      setClassesList(response.data.classes);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="py-5 text-cyan-800 font-semibold">
      <h2>My Classes</h2>
      <div className="py-5 grid grid-cols-4 gap-5">
        {classList &&
          classList.map(
            (
              { name, code, students, _id }, //class id for url
            ) => (
              <div key={code} className="bg-cyan-200 border-mauve-500 p-5 ">
                <h2>Class: {name}</h2>
                <p>Code: {code}</p>
                <p>Total Students: {students.length}</p>
                <Link
                  to={`/teacher/class/${_id}`}
                  className="bg-cyan-600 px-4 py-2 rounded-md mt-4 inline-block text-white"
                >
                  View
                </Link>
                {/* <Link
                  to={`/teacher/class/${_id}/edit`}
                  className="bg-cyan-600 px-4 py-2 rounded-md mt-4 inline-block"
                >
                  Edit
                </Link> */}
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default Classes;
