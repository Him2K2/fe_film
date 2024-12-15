import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    username: '',
    dateOfBirth: '',
    budget: '',
  });

  const [originalUser, setOriginalUser] = useState({}); // Lưu dữ liệu ban đầu

  useEffect(() => {
    getUserById();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const getUserById = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(`http://localhost:8086/api/v1/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUser(result.data);
      setOriginalUser(result.data); // Lưu dữ liệu gốc
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    try {
      console.log('Data sent to server:', user); // Kiểm tra dữ liệu gửi đi
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8086/api/v1/users/edit/${username}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };
  

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-dark'>
          <h2 className='text-center m-4'>Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='Name' className='form-label'>Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your name...'
                name='name'
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='UserName' className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your username...'
                name='username'
                value={user.username}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Birth' className='form-label'>Birth</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your birth...'
                name='dateOfBirth'
                value={user.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='Budget' className='form-label'>Budget</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your budget...'
                name='budget'
                value={user.budget}
                onChange={handleInputChange}
              />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
            <Link to='/' className='btn btn-secondary mx-2'>Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
