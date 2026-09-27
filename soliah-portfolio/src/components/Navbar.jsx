import { useEffect, useState } from 'react'
import { profile } from '../data'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  // Highlight the link for the section currently on screen
  useEffect(() => {
    const sections = links
      .map(link => document.getElementById(link.href.slice(1)))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(section => observer.observe(section))

    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header className={`sticky top-0 z-40 bg-pine text-white transition-shadow ${scrolled ? 'shadow-lg shadow-pine-dark/25' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" className="flex items-center gap-3 font-display text-lg font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf text-sm text-pine-dark">SA</span>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-8 text-[15px] md:flex">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'true' : undefined}
                className={`relative py-1 transition-colors ${
                  active === link.href
                    ? 'text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-leaf'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            
            <a
              download
              className="rounded-full bg-white px-4 py-2 font-medium text-pine transition-colors hover:bg-leaf hover:text-pine-dark"
            >
              Download CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-full border border-white/40 px-4 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-white/15 px-5 pb-5 pt-2 md:hidden">
          {links.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className="block py-3 text-lg">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} download className="mt-2 inline-block rounded-full bg-white px-5 py-2 font-medium text-pine">
              Download CV
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Navbar