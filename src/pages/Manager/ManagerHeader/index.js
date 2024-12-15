import classNames from "classnames/bind";
import styles from "./ManagerHeader.module.scss";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManagerHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');

  
    navigate('/');
  };

  return ( 
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <h1>Nick Flex</h1>
      </div>
      <div className={cx("logout")}>
        <button className={cx("btnlogout")} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ManagerHeader;
