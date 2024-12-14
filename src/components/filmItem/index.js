import classNames from "classnames/bind";
import styles from "./FilmItem.module.scss";

const cx = classNames.bind(styles);
function FilmItem({film,onClick}) {
    return ( 
    <div className={cx("wrapper")} onClick={onClick}>
        <img className={cx("filmimg")} src={film.imgFilm} alt="anhphim"></img>
        <h3 className={cx("filmname")}>{film.filmName}</h3>
        <span className={cx("caption")}>{film.caption}</span>
    </div> );
}

export default FilmItem;