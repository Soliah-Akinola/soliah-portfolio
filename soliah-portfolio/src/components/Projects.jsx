import { useState } from 'react'
import Section from './Section'
import ProjectPreview from './ProjectPreview'
import { projects, profile } from '../data'

const filters = [
  { label: 'All', test: () => true },
  { label: 'React', test: p => p.tech.includes('React') },
  { label: 'JavaScript', test: p => p.tech.includes('JavaScript') },
  { label: 'HTML & CSS', test: p => p.tech.includes('HTML') },
]

const ExternalIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M8 4H4v12h12v-4M11 3h6v6M17 3l-8 8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
)

const ProjectLinks = ({ project }) => (
  <div className="mt-5 flex flex-wrap gap-3">
    {project.live && (
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-pine px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pine-dark"
      >
        <ExternalIcon /> Live site
      </a>
    )}
    {project.repo && (
      <a
        href={project.repo}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-pine hover:text-pine"
      >
        <GithubIcon /> Source code
      </a>
    )}
  </div>
)

const TechTags = ({ tech }) => (
  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
    {tech.map(t => (
      <li key={t} className="rounded-md bg-pine-soft px-2.5 py-1 text-xs font-medium text-pine-dark">{t}</li>
    ))}
  </ul>
)

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const activeFilter = filters.find(f => f.label === filter)
  const visible = projects.filter(activeFilter.test)
  const featured = visible.find(p => p.featured)
  const rest = visible.filter(p => p !== featured)

  return (
    <Section
      id="work"
      title="Selected work"
      intro="A selection of websites and web apps I've designed and built. Every preview is the live site, running right now."
    >
      {/* Filters */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map(f => {
          const count = projects.filter(f.test).length
          const isActive = f.label === filter
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(f.label)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-pine text-white' : 'border border-line bg-white text-muted hover:border-pine hover:text-pine'
              }`}
            >
              {f.label} <span className={isActive ? 'text-white/70' : 'text-muted/70'}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Featured project */}
      {featured && (
        <article className="mb-10 grid items-center gap-8 rounded-3xl border border-line bg-white p-5 sm:p-8 md:grid-cols-[1.5fr_1fr]">
          <a href={featured.live || featured.repo} target="_blank" rel="noreferrer" aria-label={`Open ${featured.title}`}>
            <ProjectPreview url={featured.live} title={featured.title} />
          </a>
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-pine px-3 py-1 text-xs font-medium text-white">Featured project</span>
              {featured.status && (
                <span className="rounded-full bg-pine-soft px-3 py-1 text-xs font-medium text-pine-dark">{featured.status}</span>
              )}
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">{featured.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{featured.description}</p>
            <TechTags tech={featured.tech} />
            <ProjectLinks project={featured} />
          </div>
        </article>
      )}

      {/* Other projects */}
      <div className="grid gap-8 md:grid-cols-2">
        {rest.map(project => (
          <article
            key={project.title}
            className="flex flex-col rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-pine/40 hover:shadow-[0_18px_40px_-24px_rgba(18,91,80,0.45)] sm:p-5"
          >
            <a href={project.live || project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
              <ProjectPreview url={project.live} title={project.title} />
            </a>
            <div className="flex flex-1 flex-col px-1 pt-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-2xl font-bold tracking-tight">{project.title}</h3>
                {project.status && (
                  <span className="rounded-full bg-pine-soft px-2.5 py-0.5 text-xs font-medium text-pine-dark">{project.status}</span>
                )}
              </div>
              <p className="mt-2 leading-relaxed text-muted">{project.description}</p>
              <TechTags tech={project.tech} />
              <div className="mt-auto">
                <ProjectLinks project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-pine-soft p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="font-display text-xl font-bold text-pine-dark">Want to see more?</h3>
          <p className="mt-1 text-muted">
            Explore the rest of my projects, experiments and source code on GitHub.
          </p>
        </div>
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-pine px-6 py-3 font-medium text-white transition-colors hover:bg-pine-dark"
        >
          <GithubIcon /> View all projects
        </a>
      </div>
    </Section>
  )
}

export default Projects