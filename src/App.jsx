import Navbar from './components/navigation/Navbar';
import { Outlet, RouterProvider, createReactRouter, createRouteConfig } from '@tanstack/react-router'
import Home from './components/pages/Home';
import About from './components/pages/About';
import Favourites from './components/pages/Favourites';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';

const routeConfig = createRouteConfig().createChildren((createRoute) => [
  createRoute({
    path: '/',
    component: Home,
  }),
  createRoute({
    path: 'favourites',
    component: Favourites,
  }),
  createRoute({
    path: 'about',
    component: About,
  }),
  createRoute({
    path: 'login',
    component: Login,
  }),
  createRoute({
    path: 'profile',
    component: Profile,
  }),

]);

const router = createReactRouter({ routeConfig });


function App() {
  return (
    <div id="app" className="App w-full h-full flex flex-col items-center relative">
      <RouterProvider router={router}>
        <Navbar />
        <Outlet />
      </RouterProvider>
    </div>
  );
}

export default App;
