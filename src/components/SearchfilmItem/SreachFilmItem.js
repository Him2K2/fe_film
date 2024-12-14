
import { Link } from "react-router-dom";
import styles from "./SearchFilmItem.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function SearchFilmItem({ data }) {
  console.log(data)
  if (!data) {
    return null; 
  }

  return (
    <Link to={`/${data.urlFilm}`} className={cx("wrapper")}>
      <Image className={cx("avatar")} src={data.imgFilm} alt={data.caption} />
      <div className={cx("info")}>
        <h5 className={cx("name")}>{data.filmName}</h5>
        <span className={cx("username")}>{data.caption}</span>
      </div>
    </Link>
  );
}

SearchFilmItem.propTypes={
  data:PropTypes.object.isRequired,
}

export default SearchFilmItem;
