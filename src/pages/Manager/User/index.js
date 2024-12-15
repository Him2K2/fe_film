import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeUser() {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang

  
  const deleteUser = async (id, currentPage) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    try {
      await axios.delete(`http://localhost:8086/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Xóa người dùng thành công!"); // Thông báo xóa thành công
      loadUsers(currentPage); // Tải lại dữ liệu sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      alert("Lỗi khi xóa người dùng!"); // Thông báo khi xảy ra lỗi
    }
  };


  // Gọi API để tải danh sách người dùng
  const loadUsers = async (page = 0) => {
    const token = localStorage.getItem("token");
    try {

      const result = await axios.get(
        `http://localhost:8086/api/v1/users?page=${page}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result)
      setUsers(result.data.content); // Lấy danh sách người dùng
      setTotalPages(result.data.totalPages); // Tổng số trang
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };



  // Xử lý khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadUsers(page);
  };

  // Tải dữ liệu trang đầu tiên khi component được render
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <h2>Danh sách người dùng</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Name</th>
              <th>Birth</th>
              <th>Password</th>
              <th>Email</th>
              <th>Budget</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.password}</td>
                <td>{user.email}</td>
                <td>{user.budget}</td>
                <td>
                  <Link
                    to={`/register`}
                    className="btn btn-primary mx-2"
                  >
                    Add
                  </Link>
                  <Link
                    to={`/editUser/${user.username}`}
                    className="btn btn-outline-primary mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

  
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${currentPage === index ? "active" : ""}`}
                key={index}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
