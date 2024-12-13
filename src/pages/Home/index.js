import { useState, useEffect } from "react";
import axios from "axios"; 
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import FilmItem from "../../components/FilmItem";
import Modal from "../../components/Modal";

const cx = classNames.bind(styles);

function Home() {
  const [banner, setBanner] = useState(""); 
  const [films, setFilms] = useState([]);
  const [showModal, setShowModal] = useState(false);  
  const [currentFilm, setCurrentFilm] = useState(null); 


  const loadBannerFilms = async () => {
    const token = localStorage.getItem("token");
    
    const possibleIds = [2, 8, 9, 10, 11];
    const randomId = possibleIds[Math.floor(Math.random() * possibleIds.length)];

    try {
      const result = await axios.get(`http://localhost:8086/api/v1/films/${randomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const film = result.data; 
      if (film && film.imgBannerFilm) {
        setBanner(film.imgBannerFilm); 
        setCurrentFilm(film); 
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };


  const loadFilms = async () => {
    const token = localStorage.getItem("token");

    try {
      const result = await axios.get(`http://localhost:8086/api/v1/films?page=0&size=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setFilms(result.data.content); 
    } catch (error) {
      console.error("Lỗi khi tải danh sách phim:", error);
    }
  };

  useEffect(() => {
    loadBannerFilms();
    loadFilms();  
  }, []);


  const openModal = (film) => {
    setCurrentFilm(film);  
    setShowModal(true);    
  };


  const closeModal = () => {
    setShowModal(false);   
    setCurrentFilm(null);  
  };

  return (
    <>
      <div className={cx("wrapper")}> 
     
        <div className={cx("banner")} onClick={() => openModal(currentFilm)}>
          <img
            className={cx("banner-img")}
            src={banner} 
            alt="Banner Film"
          />
        </div>
        
        <h3 className={cx("caption")}>Phim Mới</h3>
        
    
        <div className={cx("content")}>
          {films.length > 0 && films.map((film) => (
            <FilmItem key={film.id} film={film} onClick={() => openModal(film)} />
          ))}
        </div>
      </div>

    
      {showModal && <Modal showModal={showModal} closeModal={closeModal} film={currentFilm} />}
    </>
  );
}

export default Home;
