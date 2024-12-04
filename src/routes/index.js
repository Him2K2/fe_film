import Home from "../pages/Home";
import Login from "../pages/Login/Login";


import route from "../config/routes";

//PublicRoutes
const publicRoutes = [
    {path:route.home,component:Home},
    {path:route.login,component:Login}
   

];


const privateRoutes = [];

export {privateRoutes,publicRoutes};