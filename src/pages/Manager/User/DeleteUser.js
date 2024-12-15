// import axios from "axios";

// const deleteUser = async (id, currentPage) => {
//     const token = localStorage.getItem("token"); // Lấy token từ localStorage
//     try {
//       await axios.delete(`http://localhost:8086/api/v1/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert("Xóa người dùng thành công!"); // Thông báo xóa thành công
//       loadUsers(currentPage); // Tải lại dữ liệu sau khi xóa
//     } catch (error) {
//       console.error("Lỗi khi xóa người dùng:", error);
//       alert("Lỗi khi xóa người dùng!"); // Thông báo khi xảy ra lỗi
//     }
//   };
  