// Layout.jsx - Main layout component for the application
import { Link, Outlet } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';


export default function Layout() {
  return (
      <>
      <Navbar/>
      <main style={{ padding: '2rem', minHeight: 'calc(100vh - 160px)' }}>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}
