import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProjectsMapImpact.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsMapImpact() {
  const sectionRef = useRef(null)
  const labelsRef = useRef([])

  useEffect(() => {
    gsap.set(labelsRef.current, { opacity: 0, y: 30 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        labelsRef.current.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i % 2 === 0 ? i * 0.15 : i * 0.15 + 0.1, // alternado
            ease: 'power2.out',
          })
        })
      },
    })
  }, [])

  const labelData = [
    { class: 'northern-beaches', text: ['47+ Projects', 'in Northern Beaches'] },
    { class: 'eastern-suburbs', text: ['31+ Projects', 'in Eastern Suburbs'] },
    { class: 'sutherland-shire', text: ['79+ Projects', 'in Sutherland Shire'] },
    { class: 'inner-west', text: ['55+ Projects', 'in Inner West'] },
    { class: 'parramatta', text: ['62+ Projects', 'in Parramatta'] },
    { class: 'north-west', text: ['41+ Projects', 'in Western Sydney'] },
    { class: 'south-sydney', text: ['49+ Projects', 'in South Sydney'] },
    { class: 'south-west', text: ['44+ Projects', 'in South West'] },
    { class: 'sydney-city', text: ['33+ Projects', 'in Sydney City'] },
    { class: 'outer-west', text: ['67+ Projects', 'in Outer West'] },
    { class: 'lower-north-shore', text: ['53+ Projects', 'in Lower North Shore'] },
    { class: 'upper-north-shore', text: ['48+ Projects', 'in Upper North Shore'] },
  ]

  return (
    <section ref={sectionRef} className="map-impact-section">
      <div className="map-impact-stage">
        <img
          src="https://ik.imagekit.io/ijsd2xvnc/Inhaus/Frame%202.png"
          className="map-layer"
          alt="Sydney map grey"
        />

        {labelData.map((label, i) => (
          <div
            key={i}
            ref={(el) => (labelsRef.current[i] = el)}
            className={`map-label ${label.class}`}
          >
            <span>{label.text[0]}</span>
            <br />
            <span>{label.text[1]}</span>
          </div>
        ))}
      </div>
    </section>
  )
}






