import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Unauthorized from "../pages/Unauthorized";
import HomeUser from "../pages/Manager/User";

import routes from "../config/routes";
import ManagerFilm from "../pages/Manager/Film";
import EditUser from "../pages/Manager/User/EditUser";

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
    
    {  path: routes.editUser, component:EditUser},
    {  path: routes.homeUser,component:HomeUser},
    {  path: routes.managerfilm,component:ManagerFilm},

];

export { privateRoutes, publicRoutes,signRoutes };

