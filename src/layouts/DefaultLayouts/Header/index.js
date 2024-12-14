import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faCoins, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import images from "../../../assets/images";
import Image from "../../../components/Image";
import Search from "../Search";
import styles from "./Header.module.scss";
import { jwtDecode } from "jwt-decode";
import Tippy from "@tippyjs/react/headless";

const cx = classNames.bind(styles);
function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token không tồn tại");
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
  
      if (decoded.role === "ADMIN") {
        navigate("/homeUser");
        return;
      }
  
      const user_query = await axios.get(
        `http://localhost:8086/api/v1/users/${decoded.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setCurrentUser(1);
      setUser(user_query.data);
    } catch (error) {
      console.error("Lỗi khi gọi API hoặc decode token:", error.message);
    }
  };
  

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/")
    window.location.reload();

  }

  const [currentUser, setCurrentUser] = useState(0);
  const [user, setUser] = useState([]);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={"/"} className={cx("logo")}>
          <img src={images.logo} alt="Film"></img>
        </Link>
        <div className={cx("navbar")}>
          <Link className={cx("nav")}>Danh sách Phát</Link>
          <Link className={cx("nav")}>Phim Hot</Link>
          <Link className={cx("nav")}>Phim Mới</Link>
          <Link className={cx("nav")}>Thể Loại</Link>
        </div>
        <Search></Search>
        <div className={cx("action")}>
          <div className={cx("user-info")}>
            <Link>
              <FontAwesomeIcon className={cx("icon")} icon={faCommentDots} />
            </Link>
            <Link>
              <FontAwesomeIcon className={cx("icon")} icon={faCartPlus} />
            </Link>
            {currentUser ? (
              <>
                <span>
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(user.budget)}
                </span>
                <FontAwesomeIcon
                  className={cx("iconmoney")}
                  icon={faCoins}
                ></FontAwesomeIcon>
                <Tippy
                  interactive
                  offset={[45 , 5]}
                  render={(attrs) => (
                    <div className={cx("avaternav")} tabIndex="-1" {...attrs}>
                      <Link to={"/recharge"}>
                        <FontAwesomeIcon
                          className={cx("iconmoneynap")}
                          icon={faCoins}
                        ></FontAwesomeIcon>
                        Nạp Tiền
                      </Link>
                      <button onClick={handleLogout}><FontAwesomeIcon
                          className={cx("iconlogout")}
                          icon={faRightFromBracket}
                        ></FontAwesomeIcon>Đăng Xuất</button>
                    </div>
                  )}
                >
                  <Image
                    src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-1/465729102_3792607924295047_7374233543698085958_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeEC4ZLlH9abuxomL99gNgODw0FF1wGV2-HDQUXXAZXb4VrOuUUNH38qE5faQCo7jjbFUJFM9gJB_RdU0DlQMkHk&_nc_ohc=CHqPTHJR3ksQ7kNvgFDQg01&_nc_zt=24&_nc_ht=scontent.fhan5-10.fna&_nc_gid=AcA9Y_175hZ-QwctgxV-BXI&oh=00_AYD7Gk0bMrBGM17Z4Fv7_u-UGAllmiUXmjLHFROS6NN_cw&oe=67365C9D"
                    className={cx("avata-user")}
                  ></Image>
                </Tippy>
                <div className={cx("details")}>
                  <span className={cx("username")}>{user.name}</span>
                  <span className={cx("email")}>{user.email}</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className={cx("loginbtn")}>Đăng Nhập</button>
                </Link>
                <Link to="/register">
                  <button className={cx("registerbtn")}>Đăng ký</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
