"use client";
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from 'react';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const botpressScript = `
  <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
  <script src="https://mediafiles.botpress.cloud/99ee75f5-6861-4ca6-b69b-70f4ae680523/webchat/config.js" defer></script>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: botpressScript }} />
      <Nav />
      {children}
      <Footer />
    </>
  )
}