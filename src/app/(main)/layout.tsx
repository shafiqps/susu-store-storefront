"use client";
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { init } from "next/dist/compiled/webpack/webpack"
import Script from "next/script"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initBotpress = () => {
    window.botpressWebChat.init({
      composerPlaceholder: "Chat with bot",
      botConversationDescription: "This chatbot was built surprisingly fast with Botpress",
      botId: "99ee75f5-6861-4ca6-b69b-70f4ae680523",
      hostUrl: "https://cdn.botpress.cloud/webchat/v1",
      messagingUrl: "https://messaging.botpress.cloud/",
      clientId: "99ee75f5-6861-4ca6-b69b-70f4ae680523",
      webhookId: "439bcac4-d16e-46ff-8d1a-2139afad2315",
      lazySocket: true,
      themeName: "prism",
      frontendVersion: "v1",
      showPoweredBy: true,
      theme: "prism",
      themeColor: "#2563eb"
    })
  }
  return (
    <>
      <Script
        src="https://cdn.botpress.cloud/webchat/v1/inject.js"
        onLoad={() => {
          initBotpress();
        }}
      />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
