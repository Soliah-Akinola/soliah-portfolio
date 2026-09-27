import Section from './Section'
import { services } from '../data'

const Services = () => {
  return (
    <Section id="services" tone="tint" title="How I can help" intro="Have something in mind that isn't listed? Get in touch and we'll work it out.">
      <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {services.map(({ title, text }) => (
          <div key={title} className="border-l-2 border-pine pl-5">
            <dt className="font-display text-xl font-bold">{title}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export default Services
