const About = () => {
  return (
    <div className="flex flex-col font-article text-center text-white w-96 h-full mt-32">
      <article className="site-description">
        Small React project built by Bartosz Tobiński who is a Front-End developer.<br/><br/>
        You can search for cats using different search filters - from breeds to weight of the cat. It is fetching the cats via usage of the Cat API<br/><br/>
        In order to use the site please create an account - it will unlock the option to add cats to favourites.<br/><br/>
        Project is built in technologies like: ReactJS, ReactQuery, TanStack Router, Tailwind CSS and FireBase.
      </article>
    </div>
  )
}

export default About