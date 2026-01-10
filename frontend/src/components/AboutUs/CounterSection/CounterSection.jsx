import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './CounterSection.css';

const stats = [
  { id: 1, plus: '+', value: 20, label: 'Years in Operation' },
  { id: 2, plus: '+', value: 150, label: 'Happy Clients' },
  { id: 3, plus: '+', value: 120, label: 'Projects Delivered' },
  { id: 4, plus: '+', value: 35, label: 'Brand Partners' },
];

export default function CounterSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="counter-section" ref={ref}>
      <div className="counter-section__intro">
        <h2 className="counter-section__title">
          Don’t just renovate, <em>experience it.</em>
        </h2>
        <p className="counter-section__subtitle">
          Discover a smoother, smarter renovation journey with a single licensed Class 2 team, from design to handover
        </p>
      </div>

      <div className="counter-section__stats">
        {stats.map(stat => (
          <div key={stat.id} className="counter-section__stat">
            <div className="counter-section__value">
              <span className="counter-section__plus">{stat.plus}</span>
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={4}
                  separator=","
                />
              ) : (
                <span>0</span>
              )}
            </div>
            <div className="counter-section__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
