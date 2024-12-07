import classNames from "classnames/bind";
import styles from "./DefaultLayouts.module.scss";
import Header from "./Header";

const cx = classNames.bind(styles);

function DefaultLayouts({children}) {
  return (
    <div className={cx("wrapper")}>
      <Header className={cx("header")}></Header>
      <div className={cx("content")}>{children}</div>
    </div>
    
  );
}

export default DefaultLayouts;
