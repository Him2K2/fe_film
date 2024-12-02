import classNames from "classnames/bind";
import styles from "./DefaultLayouts.module.scss";
import Header from "./Header";
import FilmItem from "../../components/FilmItem";

const cx = classNames.bind(styles);

function DefaultLayouts() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("tieude")}>
        <Header className={cx("header")}></Header>
        <div className={cx("banner")}>
            <img className={cx("banner")} src="https://www.venuscinema.vn/uploaded/slideshow/banner-moana-new.jpg"></img>
        </div>
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
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
        <FilmItem></FilmItem>
      </div>
    </div>
  );
}

export default DefaultLayouts;
