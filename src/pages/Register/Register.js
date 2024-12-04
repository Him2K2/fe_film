import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate=useNavigate();

  const [user,setUser]=useState({
    name:"",
    username:"",
    email:"",
  })

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value});

  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8080/user",user);
    navigate("/")

  }

  return (
    <div className='container'>

        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow '>
              <h2 className='text-center m-4'>Register User</h2>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>Name</label>
              </div>
              <form onSubmit={(e)=>handleSubmit(e)}>
              <input
              type={"text"}
              className='form-control'
              placeholder='enter your name...'
              name='name'
              value={user.name}
              onChange={handleInputChange}
              ></input>
               <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>UserName</label>
              </div>
              <input
              type={"text"}
              className='form-control'
              placeholder='enter your username...'
              name='username'
              value={user.username}
              onChange={handleInputChange}
              ></input>
               <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>Email</label>
              </div>
              <input
              type={"text"}
              className='form-control'
              placeholder='enter your email...'
              name='email'
              value={user.email}
              onChange={handleInputChange}
              ></input>

              <button type='submit' className='btn btn-outline-primary'>Submit</button>
              <Link to={"/"} className='btn btn-outline-danger mx-2'>Cancel</Link>
              </form>
            </div>
          
            

        </div>
    </div>
  ) 
}