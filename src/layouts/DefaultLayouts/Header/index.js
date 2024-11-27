import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import images from "../../../assets/images"

const cx = classNames.bind(styles);
function Header() {
    return ( 
        <header className={cx("wrapper")}>
        <div className={cx("inner")}>
        <Link to={"/"} className={cx("logo")}>
          <img src={images.logo} alt="TITOK"></img>
        </Link>
          <div className={cx("navbar")}></div>
          <div className={cx("search")}></div>
          <div className={cx("action")}></div>
        </div>
      </header>
     );
}

export default Header;