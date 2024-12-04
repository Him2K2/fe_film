import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Unauthorized from "../pages/Unauthorized";

import route from "../config/routes";

//PublicRoutes
const publicRoutes = [
    {path:route.home,component:Home},
    {path:route.login,component:Login},
    {path:route.unauthorized, component:Unauthorized}
];


const privateRoutes = [
    {
        path: route.admin, // component: AdminPage, 
        allowedRoles: [1], // Chỉ admin được phép truy cập
    },
];

export { privateRoutes, publicRoutes };

