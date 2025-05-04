import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Coffee, 
  LayoutDashboard, 
  CalendarDays, 
  ShoppingBasket, 
  CreditCard,
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items for the sidebar
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Tables", path: "/admin/tables", icon: <Coffee size={20} /> },
    { name: "Bookings", path: "/admin/bookings", icon: <CalendarDays size={20} /> },
    { name: "Inventory", path: "/admin/inventory", icon: <ShoppingBasket size={20} /> },
    { name: "Billing", path: "/admin/billing", icon: <CreditCard size={20} /> },
  ];

  // Check if the current path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear authentication from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex text-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-gray-800 border-r border-gray-700 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Coffee className="text-orange-400" />
            <span className="font-bold text-xl">CafeX Admin</span>
          </Link>
          <button 
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-orange-400 text-gray-900'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="pt-8 mt-8 border-t border-gray-700">
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              className="flex w-full items-center px-4 py-3 text-sm text-red-400 hover:bg-gray-700 rounded-lg"
            >
              <LogOut className="mr-3" size={20} />
              <span>Log Out</span>
            </Button>
            
            <Link 
              to="/" 
              className="flex items-center px-4 py-3 mt-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg"
            >
              <Home className="mr-3" size={20} />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className="bg-gray-800 border-b border-gray-700 shadow-lg h-16 flex items-center justify-between px-4 lg:px-6">
          <button 
            className="p-2 rounded-md lg:hidden text-gray-300 hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center ml-auto">
            <div className="relative">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Avatar className="h-8 w-8 bg-orange-400 text-gray-900">
                  <AvatarImage src="" alt="User avatar" />
                  <AvatarFallback>OW</AvatarFallback>
                </Avatar>
                <span className="ml-2 hidden md:inline-block text-gray-200">Cafe Owner</span>
                <ChevronDown size={16} className="ml-1 text-gray-400" />
              </div>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-1 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-20">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}