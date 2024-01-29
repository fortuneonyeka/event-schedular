import "./App.css";
import SideNav from "./components/Navigation/SideNav";
import BasicCalendar from "./components/basicCalendat/BasicCalendar";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Events from "./components/Events";

const Layout = () => {
  return (
    <div>
     <SideNav />
      <ScrollRestoration />
      <Outlet />
      
    </div>
  );
};

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"/",
        element: <Dashboard />,
        // loader: productData,
      },
      {
        path:"/calendar",
        element: <BasicCalendar />
      },
      {
        path:"/events",
        element: <Events />
      },
     
      
    ]
  }
])


function App() {
  return (
    <div className="app">
      <div className="conten">
        
        <div className="calendar-container">
        <RouterProvider router={router}/>
        </div>
      </div>
    </div>
  );
}

export default App;
