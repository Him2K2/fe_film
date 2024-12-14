import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Recharge.module.scss";
import axios from "axios"; 
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Recharge() {
   let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token); 
  const username = decoded.username;
  

  const [amount, setAmount] = useState("");

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRecharge = async () => { 
    try {
      const result = await axios.post(
        `http://localhost:8086/api/v1/users/recharge?budget=${amount}&username=${username}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status === 200) {
        alert(`Bạn đã nạp thành công ${amount} VNĐ vào tài khoản.`);
        navigate("/")
      } else {
        alert("Có lỗi xảy ra trong quá trình nạp tiền.");
      }
    } catch (error) {
      console.error("Lỗi khi nạp tiền:", error);
      alert("Đã xảy ra lỗi khi nạp tiền, vui lòng thử lại.");
    }


    
  };
  console.log(`User ID: ${username}, Amount: ${amount}`);

  return (
    <div className={cx("wapper")}>
      <div className={cx("info")}>
        <h2 className={cx("caption2")}>Thông Tin Thanh Toán</h2>
        <div className={cx("infoaccount")}>
          <p>
            Username người dùng: <span className={cx("id")}>{username || "Chưa có username"}</span>
          </p>
          <label>
            Nhập số tiền cần nạp:
            <input
              type="number"
              value={amount}
              onChange={handleInputChange}
              className={cx("input")}
              placeholder="Nhập số tiền"
            />
          </label>
        </div>
        <button className={cx("button")} onClick={handleRecharge}>
          Xác Nhận Nạp Tiền
        </button>
      </div>
      <div className={cx("momo")}>
        <h1 className={cx("caption2")}>Chọn Phương thức thanh toán</h1>
        <div className={cx("pptt")}>
          <h4>Ví MoMo</h4>
          <img className={cx("momoimg")} src="https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0" />
        </div>
        <img
          className={cx("qrimg")}
          src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/470228841_3822029231352916_5211963219471981149_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGX8pp8LyeSPVEDFuhK-Ujtzz_TwT2UsBzPP9PBPZSwHGQJaISnJZFoULHXzghAZnQGu7ySSyz5SO-pByWFknSr&_nc_ohc=MyvW3C6XGDoQ7kNvgGblqd9&_nc_zt=23&_nc_ht=scontent.fhan5-9.fna&_nc_gid=A7RDIWPmkKr-Qgk-3mJvI54&oh=00_AYBqfdfdP6Tjn8hkETeFzYX34EdBlw9ay7Iz0vdT3ZHmig&oe=676342EA"
        />
      </div>
    </div>
  );
}
