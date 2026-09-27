import Section from './Section'
import { about, education } from '../data'

const About = () => {
  return (
    <Section id="about" title="About me" tone="tint">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          {about.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="space-y-5 self-start">
          <aside className="rounded-2xl border border-line bg-white p-7">
            <h3 className="font-display text-xl font-bold text-pine-dark">Education</h3>
            <p className="mt-4 font-medium">{education.qualification}</p>
            <p className="text-muted">{education.school}, {education.detail}</p>
          </aside>

          <aside className="rounded-2xl bg-pine p-7 text-white">
            <h3 className="font-display text-xl font-bold">Open to collaboration</h3>
            <p className="mt-3 leading-relaxed text-white/80">
              I'm always happy to team up with designers, developers and founders on new ideas, open-source work or client projects.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-block rounded-full bg-leaf px-5 py-2.5 font-medium text-pine-dark transition-colors hover:bg-white"
            >
              Start a conversation
            </a>
          </aside>
        </div>
      </div>
    </Section>
  )
}

export default About