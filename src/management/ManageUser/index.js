import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function Home() {
  const {id}=useParams;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8086/users");

    setUsers(result.data);
  };

  const deleteUser=async(id)=>{
    await axios.delete(`http://localhost:8086/user/${id}`);
    loadUsers();
  }
  return (
    <div className="container">
      <div className="py-4">
        <table class="table boder shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">UserName</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, id) => (
              <tr>
                <th scope="row" key={id}>
                  {data.id}
                </th>
                <td>{data.name}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>
                    <button className="btn btn-primary mx-2">View</button>
                    <Link to={`/editUser/${data.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
                    <button 
                    onClick={()=>deleteUser(data.id)}
                    className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}