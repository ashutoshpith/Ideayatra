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
const ga_tag = process.env.GOOGLE_ANALYTIC_TAG

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>

      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga_tag}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive" >
        {
        `
        window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', ${ga_tag});
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
    </html>
  );
}

export default RootLayout;
