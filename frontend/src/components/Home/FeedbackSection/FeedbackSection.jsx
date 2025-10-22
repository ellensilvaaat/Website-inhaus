import React, { useState } from 'react';
import './FeedbackSection.css';
import FeedbackModal from './FeedbackModal';

const initialFeedbacks = [
  {
    id: 1,
    name: 'Michael Culbert',
    stars: 5,
    comment:
      'I am having a full kitchen and bathroom renovation done by Richard and his team. So far my experience has been absolutely extraordinary. I was provided a very competitive price and the service I have been given, from the moment I walked in the store, has been exceptional. Richard and his team go the extra mile with everything they do. If only more businesses gave this level of service!',
  },
  {
    id: 2,
    name: 'Joe Lattouf',
    stars: 5,
    comment:
      'I used this company recently for my house renovations (when they were at more park space) and they delivered a great final finish and in fact I will be using them again and am so happy they have opened in the region closer to home.',
  },
  {
    id: 3,
    name: 'Rina McBride',
    stars: 5,
    comment:
      'I am extremely happy with my new bathroom renovation, I can not thank the team at Inhaus Living enough. From the beginning concept with John to the end, it was seamless and easy. The team commenced the job while I was overseas, Joe the Project Manager was amazing keeping me up to date and sending regular photos of their progression.',
  },
  {
    id: 4,
    name: 'Amy L',
    stars: 5,
    comment:
      'Inhaus was amazing. My first time doing a renovation and John was so patient, answering Amy and all questions I had. Joe (project manager) was amazing, got things going quickly and efficiently. Adapted to changes that I wanted to make and was very prompt in their communication. There has been some minor follow‑ups to my place and Inhaus has been responsive, months after the renovation was fully paid for.',
  },
 
  {
    id: 5, name: 'User 5', stars: 4, comment: 'Good work overall.'},
  {
    id: 6, name: 'User 6', stars: 5, comment: 'Fantastic service.'},
  {
    id: 7, name: 'User 7', stars: 4, comment: 'Very happy with results.'},
  {
    id: 8, name: 'User 8', stars: 3, comment: 'Satisfactory but some delays.'},
  {
    id: 9, name: 'User 9', stars: 5, comment: 'Outstanding professionalism.'},
  {
    id: 10, name: 'User10', stars: 5, comment: 'I recommend to everyone.'},
  {
    id: 11, name: 'User11', stars: 4, comment: 'Good value for money.'},
  {
    id: 12, name: 'User12', stars: 4, comment: 'Pleasant experience.'},
  {
    id: 13, name: 'User13', stars: 5, comment: 'Exceeded expectations.'},
  {
    id: 14, name: 'User14', stars: 5, comment: 'Will use again.'},
  {
    id: 15, name: 'User15', stars: 5, comment: 'Truly excellent.'},
];

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks([ newFeedback, ...feedbacks ]);
    setModalOpen(false);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section className="feedback-section">
      <h2 className="feedback-section__title">What people say</h2>
      <p className="feedback-section__subtitle">
        Discover what our satisfied customers have to say about their experience with our services.
      </p>

      <div className="feedback-section__carousel">
        <button className="feedback-section__arrow feedback-section__arrow--left" onClick={() => {
          // Scroll left
          document.querySelector('.feedback-section__track').scrollBy({ left: -320, behavior: 'smooth' });
        }}>‹</button>

        <div className="feedback-section__track">
          {feedbacks.map((f) => (
            <div key={f.id} className="feedback-card">
              <h3 className="feedback-card__name">{f.name}</h3>
              <div className="feedback-card__stars">
                {Array(f.stars).fill('★').join('')}
              </div>
              <p className="feedback-card__comment">{f.comment}</p>
            </div>
          ))}
        </div>

        <button className="feedback-section__arrow feedback-section__arrow--right" onClick={() => {
          document.querySelector('.feedback-section__track').scrollBy({ left: 320, behavior: 'smooth' });
        }}>›</button>
      </div>

      <button className="feedback-section__add-btn" onClick={openModal}>
        Add your review
      </button>

      {modalOpen && (
        <FeedbackModal
          onClose={closeModal}
          onSubmit={handleAddFeedback}
        />
      )}
    </section>
  );
}
