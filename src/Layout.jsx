// Layout.jsx - Main layout component for the application
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen pt-0">
        {children}
      </main>
      <Footer /> 
    </>
  );
}
