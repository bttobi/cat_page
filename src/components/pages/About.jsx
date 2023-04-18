import { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="flex flex-col font-article text-center text-white w-96 mt-32 mb-16">
      <article className="site-description flex flex-col gap-4 bg-dark rounded-lg mx-8 mb-16 p-8 lg:text-xl text-md shadow-lg shadow-black">
        <p>Small React.js project built by Bartosz Tobiński who is a Front-End developer and an ICT student.</p>
        <p>You can search for cats using different search filters - from breeds to weight of the cat. It is fetching the cats via usage of the Cat API.</p>
        <p>In order to use the site please create an account - it will unlock the option to add cats to favourites.</p>
        <p>Project is built in technologies like: ReactJS, ReactQuery, React Router, Tailwind CSS, daisyUI and Firebase.</p>
      </article>
      <div className="button-wrapper flex justify-center">
        <a href="https://www.tobinski.pl" target="_blank" aria-label="Go to my portfolio website" className="btn btn-sm bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-dark" >Portfolio Website</a>
      </div>
    </motion.div>
  )
}

export default About