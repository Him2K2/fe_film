import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Register() {
  let navigate=useNavigate();

  const [user,setUser]=useState({
    name:"",
    username:"",
    password:"",
    retypePassword:"",
    email:"",
    birth:2024,
    roleId:1,

  })

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value});

  }

  const handleSubmit= async(e)=>{
    console.log(user)
    e.preventDefault();
    await axios.post("http://localhost:8086/api/v1/users/register",user);
    navigate("/")

  }

  return (
    <div className={cx("cc")}>
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="col-md-6 border rounded p-4 shadow bg-light">
      <h2 className="text-center m-4">Register User</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name..."
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username..."
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password..."
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="RetypePassword" className="form-label">Retype Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Retype your password..."
            name="retypePassword"
            value={user.retypePassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email..."
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Birth" className="form-label">Birth</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter your birth year..."
            name="birth"
            min="1900"
            max={new Date().getFullYear()}
            value={user.birth}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">Submit</button>
        <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
      </form>
    </div>
  </div>
</div>

  ) 
}