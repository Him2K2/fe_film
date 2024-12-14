import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Buy.module.scss";
import axios from "axios"; 
import {jwtDecode} from "jwt-decode"; 
import { Link,useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

export default function Buy() {
    const { id } = useParams();
   let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token); 
  console.log(decoded)
  const username = decoded.username;
  
  
  const [film, setFilm] = useState(null); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadFilm = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/api/v1/films/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setFilm(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin film:", error);
        alert("Không thể lấy thông tin film.");
      } finally {
        setLoading(false);
      }
    };
    loadFilm();
  }, [id, token]);


  const payment= {
    username : decoded?.username,
    filmId : film?.id,
    amount : 20000,
    status : "on"
  }
  if (!film) return <div>Loading...</div>;
console.log(payment)
  const buyFilm = async () => {
    try {
       await axios.post(
        "http://localhost:8086/api/v1/payment/create",
        payment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Mua phim thành công!");
      navigate("/"); 
    } catch (error) {
      console.error("Lỗi khi mua phim:", error);
      alert("Đã xảy ra lỗi khi mua phim. Vui lòng thử lại.");
    }
  };
  
  if (loading) return <div>Loading...</div>; 
  

  return (
    <div className={cx("wapper")}>
      <div className={cx("info")}>
        <div className={cx("infoaccount")}>
        <h2 className={cx("caption1")}>Thông Tin Thanh Toán</h2>
        <div className={cx("b1")} >
             <img className={cx("imgfilm")} src={film.imgFilm}></img>
             <div className={cx("inforfilm")}>
                  <p className={cx("id1")}>
                    Username người dùng: <span className={cx("id")}>{username || "Chưa có username"}</span>
                  </p>
                  <p className={cx("id1")} >
                    ID Phim:  <span className={cx("id")}>{film.id || "Chưa có username"}</span>
                  </p>
                  <p className={cx("id1")}>
                   Tên Phim: <span className={cx("id")}>{film.filmName || "Chưa có tên Phim"}</span>
                  </p>
                  <p className={cx("id1")} >
                    Tiêu Đề: <span className={cx("id")}>{film.caption || "Chưa có Phim"}</span>
                  </p>
                  <p className={cx("id1")} >
                    Đánh giá Phim: <span className={cx("id")}>{film.averageRating}<FontAwesomeIcon className={cx("star")} icon={faStar}></FontAwesomeIcon></span>
                  </p>
                  <p className={cx("id1")} >
                    Giá Phim:  <span className={cx("id")}>20000đ</span>
                  </p>
             </div>
        </div>
         
        </div>
       <div  className={cx("btn")}>
            <button className={cx("button1")} >
             <Link  className={cx("button1")} to={"/"}>Hủy</Link>
            </button>
            <button className={cx("button")} onClick={buyFilm}>
              Xác Nhận Mua Film
            </button>
       </div>
      </div>
      <div className={cx("momo")}>
        <h1 className={cx("caption2")}>Chọn Phương thức thanh toán</h1>
        <div className={cx("pptt")}>
          <h4>Ví MoMo</h4>
          <img className={cx("momoimg")} src="https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0" />
        </div>
        <img
          className={cx("qrimg")}
          src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/470228841_3822029231352916_5211963219471981149_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGX8pp8LyeSPVEDFuhK-Ujtzz_TwT2UsBzPP9PBPZSwHGQJaISnJZFoULHXzghAZnQGu7ySSyz5SO-pByWFknSr&_nc_ohc=MyvW3C6XGDoQ7kNvgGblqd9&_nc_zt=23&_nc_ht=scontent.fhan5-9.fna&_nc_gid=A7RDIWPmkKr-Qgk-3mJvI54&oh=00_AYBqfdfdP6Tjn8hkETeFzYX34EdBlw9ay7Iz0vdT3ZHmig&oe=676342EA"
        />
      </div>
    </div>
  );
}
