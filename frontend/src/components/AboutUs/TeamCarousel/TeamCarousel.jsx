import React from 'react';
import './TeamCarousel.css';

const team = [
  {
    id: 1,
    name: 'Alexandra Reed',
    image: '/team1.jpg',
    description: 'Project lead with 10+ years of experience in residential builds.',
  },
  {
    id: 2,
    name: 'Brandon Liu',
    image: '/team1.jpg',
    description: 'Master builder specialising in heritage restorations.',
  },
  {
    id: 3,
    name: 'Carmen Ortiz',
    image: '/team1.jpg',
    description: 'Interior designer who blends comfort with innovation.',
  },
  {
    id: 4,
    name: 'Daniela Kim',
    image: '/team1.jpg',
    description: 'Expert in automation and electrical integration.',
  },
  {
    id: 5,
    name: 'Ethan Wright',
    image: '/team1.jpg',
    description: 'Procurement manager ensuring top quality materials.',
  },
  {
    id: 6,
    name: 'Fiona Zhang',
    image: '/team1.jpg',
    description: 'Client liaison ensuring smooth communication.',
  },
  {
    id: 7,
    name: 'George Patel',
    image: '/team1.jpg',
    description: 'Heritage specialist navigating complex regulations.',
  },
  {
    id: 8,
    name: 'Hannah Nguyen',
    image: '/team1.jpg',
    description: 'Sustainability advisor focused on green building.',
  },
  {
    id: 9,
    name: 'Isabelle Moore',
    image: '/team1.jpg',
    description: 'Wet-area expert with a focus on functionality.',
  },
  {
    id: 10,
    name: 'Jack Thompson',
    image: '/team1.jpg',
    description: 'Showroom guide helping clients pick perfect finishes.',
  },
];

export default function TeamCarousel() {
  return (
    <section className="team-carousel">
      <h2 className="team-carousel__title">Meet our team</h2>
      <div className="team_underline"></div>
      <h3 className="team-carousel__subtitle">The Faces Behind Your Renovation Journey</h3>
      <div className="team-carousel__container">
        {team.map((member) => (
          <div className="team-card" key={member.id}>
            <div
              className="team-card__image"
              style={{ backgroundImage: `url(${member.image})` }}
            >
              <div className="team-card__overlay">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__description">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
