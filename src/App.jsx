import { Outlet, RouterProvider, createReactRouter, createRouteConfig } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/navigation/Navbar';
import CatBreeds from './components/pages/CatBreeds';
import About from './components/pages/About';
import Favourites from './components/pages/Favourites';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Random from './components/pages/Random';

const routeConfig = createRouteConfig().createChildren((createRoute) => [
  createRoute({
    path: '/',
    component: Random,
  }),
  createRoute({
    path: 'cat_breeds',
    component: CatBreeds,
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
