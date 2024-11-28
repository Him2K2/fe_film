import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./FilmItem.module.scss";
import classNames from "classnames/bind";
import Image from "../Image";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function FilmItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx("wrapper")}>
      <Image className={cx("avatar")} src={data.avatar} alt={data.full_name}></Image>

      <div className={cx("info")}>
        <h5 className={cx("name")}>
          {data.full_name}
          {data.tick &&<FontAwesomeIcon
            className={cx("checkIcon")}
            icon={faCheckCircle}
          ></FontAwesomeIcon>}
        </h5>

        <span className={cx("username")}>{data.nickname}</span>
      </div>
    </Link>
  );
}
FilmItem.propTypes={
  data:PropTypes.object.isRequired,
}

export default FilmItem;
