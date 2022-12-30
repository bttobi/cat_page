import { Outlet, RouterProvider, createReactRouter, createRouteConfig } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/navigation/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Favourites from './components/pages/Favourites';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
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
    path: 'register',
    component: Register,
  }),
  createRoute({
    path: 'profile',
    component: Profile,
  })
]);

const router = createReactRouter({ routeConfig });
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <div className="App w-full h-full flex flex-col items-center relative">
          <Navbar />
          <Outlet />
        </div>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
