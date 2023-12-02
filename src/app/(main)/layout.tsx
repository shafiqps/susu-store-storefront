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
<script>
  window.botpressWebChat.init({
      "composerPlaceholder": "Chat with Suffy Ai",
      "botConversationDescription": "All your susu needs",
      "botId": "99ee75f5-6861-4ca6-b69b-70f4ae680523",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "99ee75f5-6861-4ca6-b69b-70f4ae680523",
      "webhookId": "439bcac4-d16e-46ff-8d1a-2139afad2315",
      "lazySocket": true,
      "themeName": "prism",
      "botName": "Suffy Ai",
      "avatarUrl": "https://i.postimg.cc/L6zKW0Vc/download-4.png",
      "stylesheet": "https://webchat-styler-css.botpress.app/prod/3f031f09-9c9b-4479-ba2f-3ae06e2ae821/v29686/style.css",
      "frontendVersion": "v1",
      "useSessionStorage": true,
      "showBotInfoPage": true,
      "enableConversationDeletion": true,
      "theme": "prism",
      "themeColor": "#2563eb"
  });
</script>`;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: botpressScript }} />
      <Nav />
      {children}
      <Footer />
    </>
  )
}