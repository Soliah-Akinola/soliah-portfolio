import { useState } from 'react'
import { profile } from '../data'

const Hero = () => {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:grid-cols-[1.35fr_1fr] md:pb-28 md:pt-24">
      <div>
        {profile.available && (
          <p className="rise rise-1 inline-flex items-center gap-2 rounded-full bg-pine-soft px-3 py-1 text-sm font-medium text-pine-dark">
            <span className="h-2 w-2 rounded-full bg-pine" aria-hidden="true" />
            Available for new projects
          </p>
        )}

        <p className="rise rise-1 mt-6 text-lg text-muted">
          {profile.name}, {profile.role}
        </p>

        <h1 className="rise rise-2 mt-3 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
          {profile.headline}
        </h1>

        <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {profile.intro}
        </p>

        <div className="rise rise-4 mt-9 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-pine px-6 py-3 font-medium text-white transition-colors hover:bg-pine-dark"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-ink px-6 py-3 font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            Start a project
          </a>
        </div>
      </div>

      <div className="rise rise-3 mx-auto w-full max-w-sm md:max-w-none">
        {!photoFailed ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            onError={() => setPhotoFailed(true)}
            className="aspect-4/5 w-full rounded-4xl object-cover"
          />
        ) : (
          <div className="flex aspect-4/5 w-full items-center justify-center rounded-4xl bg-pine-soft font-display text-7xl font-bold text-pine" aria-label={`${profile.name} initials`}>
            SA
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
