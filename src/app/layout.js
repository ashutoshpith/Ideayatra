import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import LayoutWithNavbar from '../components/LayoutWithNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";

const inter = Nunito_Sans({
  subsets: ['latin'], // Choose the subset you need
  weight: ['400', '700'], // Specify weights you need (e.g., regular, bold)
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
      <meta name="description" content="Empowering the student journey" />
        <meta name="keywords" content="edtech, education, startup, upskill" />
        <meta property="og:title" content="IdeaYatra" />
        <meta property="og:description" content="Empowering the student journey" />
        <meta property="og:image" content="/public/ideayatra.png" />
        <meta property="og:url" content="https://ideayatra.com" />
        <meta name="twitter:card" content="summary_large_image" />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-62V7FZ0MPL" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive" >
        {
        `
        window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-62V7FZ0MPL');
        `
        }
        </Script>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-mainTheme",
          inter.className
        )}
      >
        <LayoutWithNavbar>
          {children}
          <ToastContainer />
        </LayoutWithNavbar>
      </body>
      {/* <GoogleAnalytics gaId="G-C44KQRM0HN" /> */}
    </html>
  );
}

export default RootLayout;
