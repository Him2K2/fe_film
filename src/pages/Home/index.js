import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import FilmItem from "../../components/FilmItem";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div>
      <div className={cx("banner")}>
        <img
          className={cx("banner")}
          src="https://www.venuscinema.vn/uploaded/slideshow/banner-moana-new.jpg"
        ></img>
      </div>
      <div className={cx("content")}>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
      </div>
    </div>
  );
}

export default Home;
