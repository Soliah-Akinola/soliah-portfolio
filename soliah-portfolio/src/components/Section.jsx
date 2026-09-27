const tones = {
  plain: 'border-t border-line',
  tint: 'bg-mint',
}

const Section = ({ id, title, intro, children, tone = 'plain', className = '' }) => {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <span className="mt-4 block h-1 w-12 rounded-full bg-pine" aria-hidden="true" />
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

export default Section