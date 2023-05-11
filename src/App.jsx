import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext, useState } from "react";
import { auth } from "./firebase.js";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/navigation/Navbar";
import { Route, Routes, HashRouter } from "react-router-dom";
import CatBreeds from "./components/pages/CatBreeds";
import About from "./components/pages/About";
import Favourites from "./components/pages/Favourites";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Random from "./components/pages/Random";

export const UserContext = createContext();
export const ProfilePictureContext = createContext([null, () => {}]);

function App() {
  const queryClient = new QueryClient();
  const [userPicture, setUserPicture] = useState(null);

  return (
    <UserContext.Provider value={auth}>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="App w-full h-full flex flex-col items-center relative"
            >
              <ProfilePictureContext.Provider
                value={[userPicture, setUserPicture]}
              >
                <Navbar />
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Random />} />
                    <Route path="/cat_breeds" element={<CatBreeds />} />
                    <Route path="/favourites" element={<Favourites />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path={"*"} element={<Random />} />
                  </Routes>
                </AnimatePresence>
              </ProfilePictureContext.Provider>
            </motion.div>
          </AnimatePresence>
        </QueryClientProvider>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
