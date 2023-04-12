import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { createContext } from 'react';
import { auth } from './firebase.js';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navigation/Navbar';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CatBreeds from './components/pages/CatBreeds';
import About from './components/pages/About';
import Favourites from './components/pages/Favourites';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Random from './components/pages/Random';

export const UserContext = createContext();

function App() {
  const queryClient = new QueryClient();

  return (
    <UserContext.Provider value={auth}>
      <BrowserRouter basename='/cat_page'>
        <QueryClientProvider client={queryClient}>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="App w-full h-full flex flex-col items-center relative">
              <Navbar />
              <AnimatePresence>
                <Routes>
                  <Route path='/' element={<Random/>}/>
                  <Route path='cat_breeds' element={<CatBreeds/>}/>
                  <Route path='favourites' element={<Favourites/>}/>
                  <Route path='about' element={<About/>}/>
                  <Route path='login' element={<Login/>}/>
                  <Route path='register' element={<Register/>}/>
                  <Route path='profile' element={<Profile/>}/>
                </Routes>
              </AnimatePresence>
            </motion.div>
        </QueryClientProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;