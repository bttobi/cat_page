import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { createContext } from 'react';
import { auth } from './firebase.js';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navigation/Navbar';
import { Route, Routes, HashRouter } from "react-router-dom";
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
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="App w-full h-full flex flex-col items-center relative">
              <Navbar />
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path='/cat_page' element={<Random/>}/>
                    <Route path='/cat_page/cat_breeds' element={<CatBreeds/>}/>
                    <Route path='/cat_page/favourites' element={<Favourites/>}/>
                    <Route path='/cat_page/about' element={<About/>}/>
                    <Route path='/cat_page/login' element={<Login/>}/>
                    <Route path='/cat_page/register' element={<Register/>}/>
                    <Route path='/cat_page/profile' element={<Profile/>}/>
                    <Route path={"*"} element={<Random />}/>
                  </Routes>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </QueryClientProvider>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;