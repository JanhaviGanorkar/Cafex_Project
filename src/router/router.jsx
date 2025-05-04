import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import About from '../component/About/about';
import Login from '../pages/auth/login';
import Privacy from '../component/Privacy/privacy';

// Admin components
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import TableManagement from '../pages/admin/TableManagement';
import BookingManagement from '../pages/admin/BookingManagement';
import InventoryManagement from '../pages/admin/InventoryManagement';
import BillingManagement from '../pages/admin/BillingManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-4xl font-bold text-orange-400">Welcome to CafeX</h1>
        </div>
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/contact',
        element: <div className="flex items-center justify-center h-[70vh]">
          <h2 className="text-2xl font-semibold">Contact page coming soon</h2>
        </div>
      },
      {
        path: '/privacy',
        element: <Privacy />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'tables',
        element: <TableManagement />
      },
      {
        path: 'bookings',
        element: <BookingManagement />
      },
      {
        path: 'inventory',
        element: <InventoryManagement />
      },
      {
        path: 'billing',
        element: <BillingManagement />
      },
      {
        // Redirect from /admin to /admin/dashboard
        index: true,
        element: <Dashboard />
      }
    ]
  }
]);