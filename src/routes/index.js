import Home from "../pages/Home";


import routes from "../config/routes";

//PublicRoutes
const publicRoutes = [
    {path:routes.home,component:Home},
   

];


const privateRoutes = [];

export {privateRoutes,publicRoutes};