import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../src/pages/homepage/Homepage.jsx";
import Root from "../src/routers/Root";
import Login from "../src/components/login/Login";
import Register from "../src/components/register/Register";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register />}
    
    ],
  },
];
const BrowserRouter = createBrowserRouter(routes);

function App() {
  const apiUrl = "https://parseapi.back4app.com/classes/FitMe";

  return( <RouterProvider router={BrowserRouter} />
  
  );
}

export default App;
