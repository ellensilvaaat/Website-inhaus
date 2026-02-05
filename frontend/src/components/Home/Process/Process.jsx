import React from 'react'
import './Process.css'

const steps = [
  {
    number: '01',
    title: 'In-Store <br/> Consultation',
    text: `Visit one of our showrooms for an in-store consultation. We'll listen to your goals, style, budget, and timeline, share expert guidance on renovation and building requirements, and walk you through finishes from our showroom to help set clear budgets and lead times.`,
    // ✅ Otimizado para alta fidelidade: w-800 e q-95
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/process-step1.png?tr=w-800,f-webp,q-95',
    alt: 'In-store consultation with client and designer',
    flip: false,
  },
  {
    number: '02',
    title: 'Site <br/> Visit',
    text: `We come to site to measure precisely and review conditions that could impact scope and budget. With this detail, Inhaus Living prepares a formal quotation and a defined scope of works; outlining job specifics, milestones, and payment stages.`,
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/process-step2.png?tr=w-800,f-webp,q-95',
    alt: 'On-site visit and evaluation by Inhaus team',
    flip: true,
  },
  {
    number: '03',
    title: 'Plans<br/>& Kickoff',
    text: `Where applicable, we finalise plans and architectural drawings before works begin. We sign off the detailed scope of works, lock in a commencement date, and assign a dedicated project manager; your single point of contact throughout the renovation.`,
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/process-step3.png?tr=w-800,f-webp,q-95',
    alt: 'Finalized renovation plans before kickoff',
    flip: false,
  },
]

const OurProcess = () => {
  return (
    <section className="our-process">
      <div className="container">
        <h2>Our Process</h2>
        <div className="underline" />

        {steps.map(({ number, title, text, image, alt, flip }, index) => (
          <div key={index} className={`process-step ${flip ? 'flip' : ''}`}>
            <div className="process-step__image">
              <img
                src={image}
                alt={alt}
                width="450" /* Largura visual no layout */
                height="450"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="process-step__text">
              <span className="step-number">{number}</span>
              <h3
                dangerouslySetInnerHTML={{
                  __html: title.replace(/(.*?)(\s+)(\S+)$/, '$1$2<strong>$3</strong>'),
                }}
              ></h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurProcess
