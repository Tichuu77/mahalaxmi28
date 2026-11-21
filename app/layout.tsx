import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "@/styles/components.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mahalaxmi Nagar 51 Anaya Nagpur | NMRDA & RERA Approved Villa Plots",
  description: "Explore Mahalaxmi Nagar 51 (Anaya) by Mahalaxmi Infra — a 78-acre master-planned residential plotted township at Mouza Sumthana, touching Samruddhi Mahamarg & MIHAN Nagpur. MahaRERA: PP1190002602003. Contact Sale Executive Bharti Bharat Sangode (+91 9579302821).",
  generator: "v0.app",
  icons: "/Mahalaxmi Infra new Logo.png",
  metadataBase: new URL('https://kb.mahalaxmiinfra.in'),
  alternates: {
    canonical: 'https://kb.mahalaxmiinfra.in'
  },
  openGraph: {
    title: "Mahalaxmi Nagar 51 Anaya | 78-Acre Villa Plotted Township Nagpur",
    description: "Premium NMRDA sanctioned & MahaRERA approved (PP1190002602003) villa plots at Mouza Sumthana, Samruddhi Corridor, Nagpur. Contact Bharti Bharat Sangode (+91 9579302821).",
    url: "https://kb.mahalaxmiinfra.in",
    siteName: "Mahalaxmi Nagar 51 Anaya",
    type: "website",
    images: [
      {
        url: "https://kb.mahalaxmiinfra.in/m51-entrance-gate.jpeg",
        width: 1200,
        height: 630,
        alt: "Mahalaxmi Nagar 51 Anaya Grand Entrance Gate"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalaxmi Nagar 51 Anaya | Villa Plots Nagpur",
    description: "78-Acre master-planned residential plotted township at Mouza Sumthana, Nagpur. MahaRERA: PP1190002602003.",
    images: ["https://kb.mahalaxmiinfra.in/m51-entrance-gate.jpeg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  keywords: [
    "Mahalaxmi Nagar 51",
    "Mahalaxmi Nagar 51 Anaya",
    "Mahalaxmi Nagar 51 Nagpur",
    "Mahalaxmi Nagar 51 Sumthana",
    "Anaya Mahalaxmi Nagar 51",
    "Anaya plots Nagpur",
    "Mahalaxmi Infra",
    "Mahalaxmi Infra Nagpur",
    "Bharti Bharat Sangode",
    "Mahalaxmi Infra Bharti Sangode",
    "plots in Mouza Sumthana Nagpur",
    "Samruddhi Mahamarg plots Nagpur",
    "plots near MIHAN Nagpur",
    "plots near AIIMS Nagpur",
    "residential plots in Wardha Road Nagpur",
    "PP1190002602003",
    "A50500041611",
    "NMRDA approved plots in Nagpur",
    "villa plots in Nagpur"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TSFLPDMJ');` }} />
        
        {/* Local Business / Real Estate Project Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Mahalaxmi Nagar 51 - Anaya (Mahalaxmi Infra)",
          "url": "https://kb.mahalaxmiinfra.in",
          "logo": "https://kb.mahalaxmiinfra.in/Malaxmi-Final-Logo.-2png.png",
          "image": "https://kb.mahalaxmiinfra.in/m51-entrance-gate.jpeg",
          "description": "Mahalaxmi Nagar 51 Anaya is a 78-acre premier master-planned residential plotted development with NMRDA sanction and MahaRERA approval (PP1190002602003) at Mouza Sumthana, Nagpur.",
          "sameAs": [
            "https://www.facebook.com/share/18PdfPMute/",
            "https://www.instagram.com/mahalaxmiinfra_ak",
            "https://www.mahalaxmiinfra.in"
          ],
          "areaServed": "Nagpur, Maharashtra, India",
          "telephone": "+91-9579302821",
          "email": "sangodebharat28@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Flat201U, Wing-A, Shridhar Residency, Besa",
            "addressLocality": "Nagpur",
            "addressRegion": "Maharashtra",
            "postalCode": "440037",
            "addressCountry": "IN"
          },
          "employee": {
            "@type": "Person",
            "name": "Bharti Bharat Sangode",
            "jobTitle": "Sale Executive",
            "telephone": "+91-9579302821",
            "email": "sangodebharat28@gmail.com"
          }
        }) }} />

        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mahalaxmi Infra",
          "alternateName": "Mahalaxmi Developers",
          "url": "https://www.mahalaxmiinfra.in",
          "logo": "https://kb.mahalaxmiinfra.in/Malaxmi-Final-Logo.-2png.png",
          "description": "Mahalaxmi Infra - A Tradition of Trust. Developing Mahalaxmi Nagar 51 Anaya at Mouza Sumthana, Nagpur.",
          "telephone": "+91-9579302821",
          "email": "sangodebharat28@gmail.com",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sale Executive",
            "telephone": "+91-9579302821",
            "email": "sangodebharat28@gmail.com"
          }
        }) }} />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TSFLPDMJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
 
        {children}
        <Analytics />
      </body>
    </html>
  )
}
