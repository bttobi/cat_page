import { Outlet, RouterProvider, createReactRouter, createRouteConfig } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navigation/Navbar';
import CatBreeds from './components/pages/CatBreeds';
import About from './components/pages/About';
import Favourites from './components/pages/Favourites';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Random from './components/pages/Random';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

function App() {
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
  const [user, setUser] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="App w-full h-full flex flex-col items-center relative">
          <Navbar />
          <AnimatePresence>
              <Outlet />
          </AnimatePresence>
        </motion.div>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;