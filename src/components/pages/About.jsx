import {motion} from 'framer-motion';

const About = () => {
  return (
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="flex flex-col font-article text-center text-white w-96 h-full mt-32">
      <article className="site-description">
        Small React project built by Bartosz Tobiński who is a Front-End developer.<br/><br/>
        You can search for cats using different search filters - from breeds to weight of the cat. It is fetching the cats via usage of the Cat API<br/><br/>
        In order to use the site please create an account - it will unlock the option to add cats to favourites as well as removing them.<br/><br/>
        Project is built in technologies like: ReactJS, ReactQuery, React Router, Tailwind CSS, daisyUI and Firebase.
      </article>
      <a href="https://www.tobinski.pl" target="_blank" aria-label="Go to my portfolio website" className="btn mt-6 w-min text-white shadow-md shadow-black">Visit my website</a>
    </motion.div>
  )
}

export default About