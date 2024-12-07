import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Unauthorized from "../pages/Unauthorized";

import routes from "../config/routes";

//PublicRoutes
const publicRoutes = [
    {path:routes.home,component:Home},
  
    {path:routes.unauthorized, component:Unauthorized}
];
const signRoutes = [

    {path:routes.login,component:Login},
    {path:routes.register,component:Register},

]

const privateRoutes = [
    {
        path: routes.admin, // component: AdminPage, 
        allowedRoles: [1], // Chỉ admin được phép truy cập
    },

];

export { privateRoutes, publicRoutes,signRoutes };

