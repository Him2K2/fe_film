import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayouts from './layouts/DefaultLayouts';
import { publicRoutes } from './routes';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute allowedRoles={route.allowedRoles}>
                <route.component />
              </ProtectedRoute>
            }/>
            ))} */}
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
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;