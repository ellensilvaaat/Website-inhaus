import React from 'react';
import './TeamCarousel.css';

const team = [
  {
    id: 1,
    name: 'Alexandra Reed',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Project lead with 10+ years of experience in residential builds.',
  },
  {
    id: 2,
    name: 'Brandon Liu',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Master builder specialising in heritage restorations.',
  },
  {
    id: 3,
    name: 'Carmen Ortiz',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Interior designer who blends comfort with innovation.',
  },
  {
    id: 4,
    name: 'Daniela Kim',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Expert in automation and electrical integration.',
  },
  {
    id: 5,
    name: 'Ethan Wright',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Procurement manager ensuring top quality materials.',
  },
  {
    id: 6,
    name: 'Fiona Zhang',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Client liaison ensuring smooth communication.',
  },
  {
    id: 7,
    name: 'George Patel',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Heritage specialist navigating complex regulations.',
  },
  {
    id: 8,
    name: 'Hannah Nguyen',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Sustainability advisor focused on green building.',
  },
  {
    id: 9,
    name: 'Isabelle Moore',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
    description: 'Wet-area expert with a focus on functionality.',
  },
  {
    id: 10,
    name: 'Jack Thompson',
    image: 'https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/team1.jpg?updatedAt=1767743444659',
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
