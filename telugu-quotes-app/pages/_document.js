import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="te">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ramabhadra&family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="AI-powered Telugu quotes generator — తెలుగు కోట్స్" />
        <meta name="theme-color" content="#0f0f13" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Telugu Quotes AI" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
