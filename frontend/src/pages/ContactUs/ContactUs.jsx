import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/ContactUs/Hero/Hero';
import ContactUsPage from '../../components/ContactUs/ContactUsPage/ContactUsPage';

export default function ContactUs() {
  return (
    <main className="contact-us">
      <Helmet>
        <title>Contact Us | Inhaus Living</title>
        <meta
          name="description"
          content="Get in touch with Inhaus Living. We're here to help you start your renovation journey. Contact our expert team today."
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Contact Us | Inhaus Living" />
        <meta
          property="og:description"
          content="Ready to renovate? Reach out to Inhaus Living for consultations, quotes, or any inquiries about your project."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inhausliving.com.au/contact" />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg" 
        />
        <link rel="canonical" href="https://inhausliving.com.au/contact" />
      </Helmet>

      <Hero />
      <ContactUsPage />
    </main>
  );
}
