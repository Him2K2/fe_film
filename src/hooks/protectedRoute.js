import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu user chưa đăng nhập hoặc role không nằm trong allowedRoles, chuyển hướng
  // if (!user || !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" />;
  // }

  // Render component nếu quyền hợp lệ
  return children;
};

export default ProtectedRoute;
