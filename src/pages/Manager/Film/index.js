import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManagerFilm() {
  const [films, setfilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0); 

  const deletefilm = async (id, currentPage) => {
    const token = localStorage.getItem("token"); 
    try {
      await axios.delete(`http://localhost:8086/api/v1/films/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Xóa người dùng thành công!"); 
      loadfilms(currentPage); 
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      alert("Lỗi khi xóa người dùng!"); 
    }
  };


  const loadfilms = async (page = 0) => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get(
        `http://localhost:8086/api/v1/films?page=${page}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setfilms(result.data.content); 
      setTotalPages(result.data.totalPages); 
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadfilms(page);
  };

  
  useEffect(() => {
    loadfilms();
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <h2>Danh sách người dùng</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Filmname</th>
              <th>Caption</th>
              <th>Description</th>
              <th>Status</th>
              <th>AverageRating</th>
              <th>Duration</th>
              <th>Genres</th>
              <th>urlFilm</th>
              <th>imgFilm</th>
              <th>imgBannerFilm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film, index) => (
              <tr key={index}>
                <td>{film.id}</td>
                <td>{film.filmName}</td>
                <td className="text-wrap" style={{ maxWidth: "100px" }}>
                  {film.caption}
                </td>
                <td className="text-wrap" style={{ maxWidth: "100px" }}>
                  {film.description}
                </td>
                <td>{film.status}</td>
                <td>{film.averageRating}</td>
                <td>{film.duration}</td>
                <td>{film.genres}</td>
                <td>
                  <a
                    href={film.urlFilm}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Xem phim
                  </a>
                </td>
                <td className="text-wrap" style={{ maxWidth: "200px" }}>
                  <img
                    src={film.imgFilm}
                    style={{ width: "150px", height: "auto" }}
                  ></img>
                </td>
                <td>
                  <img
                    src={film.imgBannerFilm}
                    style={{ width: "150px", height: "auto" }}
                  ></img>
                </td>

                <td>
                  <Link to={`/addfilm`} className="btn btn-primary mx-2">
                    Add
                  </Link>
                  <Link
                    to={`/editfilm/${film.id}`}
                    className="btn btn-outline-primary mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletefilm(film.id)}
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
