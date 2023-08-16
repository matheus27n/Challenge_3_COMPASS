import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../src/pages/homepage/Homepage.jsx";
import Root from "../src/routers/Root";
import Login from "../src/components/login/Login";
import Register from "../src/components/register/Register";
import ItensPage from '../src/pages/restaurantePage/ItensPage'


const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register />},
      { path: "ItensPage/:restauranteId", element: <ItensPage />}

    ],
  },
];
const BrowserRouter = createBrowserRouter(routes);

function App() {
  return( 
  <RouterProvider router={BrowserRouter} />


  
  );
}

export default App;
