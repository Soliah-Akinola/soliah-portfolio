import Section from './Section'
import { skills } from '../data'

const Skills = () => {
  return (
    <Section id="skills" title="Skills and tools" intro="What I use to design, build and ship.">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map(({ group, items }) => (
          <div key={group}>
            <h3 className="border-b border-ink pb-3 font-display text-lg font-bold">{group}</h3>
            <ul className="mt-4 space-y-2 text-muted">
              {items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
