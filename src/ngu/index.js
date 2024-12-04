import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../helpers/common";

interface PermissionLayoutProps {
  children?: ReactNode; // Các thành phần con cần hiển thị nếu được phép.
  isLogin?: boolean; // Xác định xem đây có phải là trang đăng nhập hay không.
}

const AuthLayout = ({ children, isLogin }: PermissionLayoutProps) => {
  const { pathname } = useLocation(); // Lấy URL hiện tại từ useLocation.
  console.log(pathname); // Ghi lại đường dẫn hiện tại để debug.

  const user = getUserInfo(); // Lấy thông tin tài khoản người dùng từ localStorage hoặc cookie.
  const role = user?.role; // Lấy vai trò của người dùng (ADMIN, MANAGER, hoặc USER).

  // Các đường dẫn chỉ dành riêng cho ADMIN.
  const adminRoutes = [
    "/admin/products",      // Trang quản lý sản phẩm.
    "/admin/categories",    // Trang quản lý danh mục.
    "/admin/users",         // Trang quản lý người dùng.
    "/admin/orders",        // Trang quản lý đơn hàng.
    "/admin/revenue",       // Trang thống kê doanh thu.
  ];

  // Các đường dẫn MANAGER không được phép truy cập.
  const managerRestrictedRoutes = ["/admin/users"];

  // Luôn cho phép người dùng truy cập trang login.
  if (pathname === "/login") {
    return <>{children}</>; // Trả lại nội dung trang login.
  }

  // Nếu người dùng không phải ADMIN hoặc MANAGER và chưa đăng nhập.
  if (role !== "ADMIN" && role !== "MANAGER" && !isLogin) {
    return <Navigate to="/products" replace />;
    // Điều hướng đến trang sản phẩm chung /products.
  }

  // Nếu người dùng đã đăng nhập và cố gắng vào trang login.
  if (user && isLogin) {
    return <Navigate to="/admin/products" replace />;
    // Điều hướng đến trang /admin/products (bảng điều khiển của ADMIN).
  }

  // Xử lý quyền truy cập dựa trên vai trò.
  if (role === "ADMIN") {
    // ADMIN được phép truy cập tất cả các trang adminRoutes.
    if (adminRoutes.includes(pathname)) {
      return <>{children}</>; // Hiển thị nội dung nếu quyền hợp lệ.
    }
  } else if (role === "MANAGER") {
    // MANAGER bị hạn chế truy cập các trang trong managerRestrictedRoutes.
    if (managerRestrictedRoutes.includes(pathname)) {
      return <Navigate to="/products" replace />;
      // Điều hướng MANAGER về /products nếu cố truy cập trang bị cấm.
    }
    // MANAGER được phép truy cập các trang còn lại trong adminRoutes.
    if (adminRoutes.includes(pathname)) {
      return <>{children}</>; // Hiển thị nội dung nếu quyền hợp lệ.
    }
  }

  // Nếu không đủ quyền truy cập, điều hướng về trang /products.
  return <Navigate to="/products" replace />;
};

export default AuthLayout;