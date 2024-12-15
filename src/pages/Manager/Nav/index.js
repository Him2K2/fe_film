import classNames from "classnames/bind";
import styles from "./Nav.module.scss";
import React from 'react'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles);
export default function Nav () {
  return (
    <div className={cx("wrapper")}>
        <Link to={"/homeUser"} className={cx("navl")}>User</Link>
        <Link to={"/managerfilm"} className={cx("navl")}>Film</Link>
        <Link className={cx("navl")}>Genre</Link>
        <Link className={cx("navl")}>PayMent</Link>
        <Link className={cx("navl")}>Review</Link>
    </div>
  )
}
