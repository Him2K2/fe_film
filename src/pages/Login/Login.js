import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode'
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);





export default function Login() {
  const isToken = localStorage.getItem("token");
  let navigate = useNavigate();
  useEffect(() => {

    if (isToken) {
      navigate("/")
      return;
    }}
  )

  

  const [user, setUser] = useState({
    username:"",
    password:"",

  })
  const [token, setToken] = useState(null);


  const handleLogin = async (e) => {
    try {
      e.preventDefault();
     
      const response = await axios.post("http://localhost:8086/api/v1/users/login", user);
      const token = response.data;

      setToken(token);
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log(decoded)
     
   

      if (response.status === 200) {
        if(decoded.role == "ADMIN"){
          navigate("/admin")
        }

        navigate("/")
        return;
      }

    } catch (error) {
      console.error("Đăng nhập thất bại:", error.response?.data || error.message);
      alert("Đăng nhập thất bại!");
    }
  };

 
  
  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value});

  }

  // const handleSubmit= async(e)=>{
  //   e.preventDefault();
  //    await axios.post("http://localhost:8086/api/v1/users/login",user);
  //   navigate("/")

  // }

  return (
    <div className={cx("cc")}>
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="col-md-6 border rounded p-4 shadow bg-light">
      <h2 className="text-center m-4">Login</h2>
      <form onSubmit={(e) => handleLogin(e)}>
       
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
        
        <button  type="submit" className="btn btn-outline-primary">Submit</button>
        <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
      </form>
    </div>
  </div>
</div>

  ) 
}