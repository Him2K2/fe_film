import classNames from "classnames/bind";
import styles from "./DefaultLayouts.module.scss";
import Header from "./Header";


const cx = classNames.bind(styles);

function DefaultLayouts() {
    return ( 
        <div className={cx("wrapper")}>
            <Header></Header>
            <div  className={cx("content")}></div>
        </div>
     );
}

export default DefaultLayouts;