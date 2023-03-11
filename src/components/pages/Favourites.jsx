import { motion } from 'framer-motion';

const Favourites = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="font-article text-white w-full h-full mt-16">
      FAVSSSSSS
    </motion.div>
  )
}

export default Favourites
