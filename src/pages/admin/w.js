// import React, { useEffect, useState } from "react";

// function AdminDashboard() {
//   const user = {
//     id: 1,
//     username: "megha",
//     email: "megha@1234gmail.com",
//     password: "meg789",
//   };
//   // api call.
//   const createUser = async () => {
//     // jibhi function mai lagega ki time lgna hai tb hum asyn func banate hai . taki agge ka code block na ho
//     const config = {
//       method: "POST", // hame create krni hai to post use kiya
//       headers: {
//         "Content-Type": "application/json", //hame obj bna k bhejna isliye json likha vrna xml bhi likh skte jo hum use kr rhe
//       }, //ye bhi ek obj hota hai
//       body: JSON.stringify(user), // JSON.stringify iske ander jo likhte vo json format mai chnge ho jayega hum normal JS ka obj to nhi bhej skte direct  kiuki humko pta ni vha kismai bani hai
//       //body mai code bhejna padhta hai jo add ya kuch bhi update krna ho jb to uper jo obj banaya vo pass kr diya body mai
//     };
//     const response = await fetch("https://fakestoreapi.com/users", config); //fetch is a promise or esko time lagega
//     //ismai hum ek url or oject pass karege
//     //agr await na lagaye to vo dusere func mai chla jayega bina wait kre phle ka jisse status pending show karega kiuki sbse phle pending hi show krta
//     const data = await response.json(); // vha se jo data aya usko store krna isliye var mai store krna padhta
//     // vha se direct data ni ata usko convert krne k liye .json() ka use krte
//     //promise hai to agge await lagega
//     console.log(response);
//     console.log(data);
//   };

//   const [users, setUsers] = useState([]);
//   const getUsers = async () => {
//     const response = await fetch("https://fakestoreapi.com/users", {
//       //url same hai method pr depend karega get krna ya post
//       method: "GET",
//     });
//     console.log(response);
//     const data = await response.json();
//     setUsers(data);
//     //uper vala sb krne k liye hum library use krege jismai vo khudse convert karega
//   };
//   useEffect(() => {
//     getUsers();
//   },[]);

//   return (
//     <div>
//       <h1>AdminDashboard</h1>
//       <button onClick={createUser}>Create User</button>
//       {users.map((user) => (
//         <p>{user.username}</p>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;
