import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../app/page.module.css';
// import "../assets/Style/index.css";
import "./globals.css"
import ReduxProvider from './ReduxProvider';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StickyButton from '../components/Stickybuttons/StickyButton';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: 'FullOnTravel: Best Travel Packages for Your Dream Destinations',
  description: 'With shared NavBar and Footer using App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyButton />
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
