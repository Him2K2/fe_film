import classNames from "classnames/bind";
import styles from "./Manager.module.scss";
import ManagerHeader from "./ManagerHeader";
import Nav from "./Nav";



const cx = classNames.bind(styles);

function Manager({children}) {
  return (
    <div className={cx("wrapper")}>
      <ManagerHeader></ManagerHeader>
      <div className={cx("container")}>
        <Nav className={cx("nav")}></Nav>
        <div className={cx("content")}>
                {children}
            </div>
      </div>
     
    </div>
    
  );
}

export default Manager;