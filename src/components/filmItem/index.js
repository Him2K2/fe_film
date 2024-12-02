import classNames from "classnames/bind";
import styles from "./FilmItem.module.scss";

const cx = classNames.bind(styles);
function FilmItem() {
    return ( 
    <div className={cx("wrapper")}>
        <img className={cx("filmimg")} src="https://upload.wikimedia.org/wikipedia/vi/0/0e/Tuyet_dinh_cong_phu.jpg" alt="anhphim"></img>
        <h3 className={cx("filmname")}>FilmName</h3>
        <span className={cx("caption")}>Caption</span>
    </div> );
}

export default FilmItem;