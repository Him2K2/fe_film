import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayouts from './layouts/DefaultLayouts';
import { ProtectedRoute } from './hooks';
import { privateRoutes,publicRoutes,signRoutes } from './routes';
import Manager from './pages/Manager';





function App() {
  return (
    <BrowserRouter>
      <div className="App">

        
        <Routes>
          
          {/* {privateRoutes.map((route, index) => (
           const Page = route.component
           return<Route
            key={index}
            path={route.path}
            element={<Page></Page>}
            >
           </Route>
            ))} */}
           {privateRoutes.map((route,index)=>{
            let Layout = Manager
            if(route.layout===1){
              Layout = Fragment
            }

            const Page = route.component
            return <Route
             key={index} 
             path={route.path} 
             element={
              <Layout>
             <Page></Page>
             </Layout>
            }
             ></Route>
          })}

          {publicRoutes.map((route,index)=>{
            let Layout = DefaultLayouts
            if(route.layout===1){
              Layout = Fragment
            }

            const Page = route.component
            return <Route
             key={index} 
             path={route.path} 
             element={
              <Layout>
             <Page></Page>
             </Layout>
            }
             ></Route>
          })}

          {signRoutes.map((route,index)=>{
            const Page = route.component
            return<Route
            key={index}
            path={route.path}
            element={<Page></Page>}
            >
            </Route>
          })}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;