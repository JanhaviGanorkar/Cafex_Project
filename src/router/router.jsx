import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
        element: <Contact />
      }
    ]
  }
]);