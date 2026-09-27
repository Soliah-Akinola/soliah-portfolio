import { profile } from '../data'

const Footer = () => {
  return (
    <footer className="bg-pine-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-3xl font-bold tracking-tight">Have a project in mind?</p>
            <p className="mt-3 text-white/75">
              I'm open to freelance work, collaborations and frontend roles. Let's build something together.
            </p>
            
            <a
              href="#contact"
              className="mt-6 inline-block rounded-full bg-leaf px-6 py-3 font-medium text-pine-dark transition-colors hover:bg-white"
            >
              Get in touch
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-white/80">
            <li><a href={`mailto:${profile.email}`} className="hover:text-white">Email</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a></li>
            <li><a href={profile.resume} download className="hover:text-white">CV</a></li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.</p>
          <a href="#top" className="hover:text-white">Back to top</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer