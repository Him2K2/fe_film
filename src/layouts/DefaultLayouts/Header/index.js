import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import images from "../../../assets/images"
import Search from "../Search";
import {  faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import Image from "../../../components/Image";
import { useState ,useEffect} from "react";

const cx = classNames.bind(styles);
function Header() {


  const currentUser = 1;
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
            <FontAwesomeIcon className={cx("icon")}  icon={faCommentDots} />
            </Link>
            <Link>
            <FontAwesomeIcon className={cx("icon")} icon={faCartPlus} />
            </Link>
            {currentUser?(
              <>
                <Image
                src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-1/465729102_3792607924295047_7374233543698085958_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeEC4ZLlH9abuxomL99gNgODw0FF1wGV2-HDQUXXAZXb4VrOuUUNH38qE5faQCo7jjbFUJFM9gJB_RdU0DlQMkHk&_nc_ohc=CHqPTHJR3ksQ7kNvgFDQg01&_nc_zt=24&_nc_ht=scontent.fhan5-10.fna&_nc_gid=AcA9Y_175hZ-QwctgxV-BXI&oh=00_AYD7Gk0bMrBGM17Z4Fv7_u-UGAllmiUXmjLHFROS6NN_cw&oe=67365C9D"
                className={cx("avata-user")}
              ></Image>
                <div className={cx("details")}>
                  <span className={cx("username")}>Tên User</span>
                  <span className={cx("email")}>user@example.com</span>
                </div>
                </>
            ):(
              <Link>
              <button className={cx("loginbtn")} >Đăng Nhập</button>
              </Link>
            )}
              </div>
           
            
          </div>
        </div>
      </header>
     );
}

export default Header;