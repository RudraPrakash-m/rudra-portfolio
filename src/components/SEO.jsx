import React from 'react';
import { Helmet } from 'react-helmet-async';
import { rudraData } from '../data/videos';

export const SEO = () => {
  const siteUrl = 'https://rudraprakash.site';
  const siteTitle = `${rudraData.name} • Full-Stack Software Developer & MERN Specialist`;
  const siteDescription = `Official portfolio of ${rudraData.name} — Full-Stack Software Developer specializing in React.js, Node.js, Express, MongoDB, Tailwind CSS, and scalable web engineering.`;
  const previewImage = `${siteUrl}/journy.png`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: rudraData.name,
    jobTitle: 'Full-Stack Software Developer',
    description: siteDescription,
    url: siteUrl,
    image: previewImage,
    sameAs: [
      rudraData.linkedin,
      rudraData.github,
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Gandhi Institute For Technology (GIFT Autonomous), Bhubaneswar',
    },
    knowsAbout: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JavaScript',
      'Tailwind CSS',
      'Full-Stack Development',
      'MERN Stack',
      'RESTful APIs',
      'JWT Authentication'
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content="Rudra Prakash Mallick, Rudra Prakash, Software Developer, Full Stack Developer, MERN Stack Developer, React Developer, Node.js Developer, Web Developer Portfolio, GIFT Autonomous, Odisha Developer" />
      <meta name="author" content={rudraData.name} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:site_name" content={`${rudraData.name} Portfolio`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={previewImage} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
