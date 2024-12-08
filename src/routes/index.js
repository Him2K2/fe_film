import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Unauthorized from "../pages/Unauthorized";
import HomeUser from "../pages/Manager/User";

import routes from "../config/routes";
import Manager from "../pages/Manager";

//PublicRoutes
const publicRoutes = [
    {path:routes.home,component:Home},
  
    {path:routes.unauthorized, component:Unauthorized}
];
const signRoutes = [

    {path:routes.login,component:Login},
    {path:routes.register,component:Register}

]

const privateRoutes = [
    {
        path: routes.admin,  component: Manager
        // allowedRoles: [2], // Chỉ admin được phép truy cập
    },


];

export { privateRoutes, publicRoutes,signRoutes };

