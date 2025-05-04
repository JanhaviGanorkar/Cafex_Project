import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // For demo purposes, you can use hardcoded credentials
      // In production, replace with actual API call
      if (email === "owner@cafex.com" && password === "admin123") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "owner");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="owner-login"
      className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 pt-24 pb-10 bg-black text-white"
    >
      <div className="space-y-6 max-w-xl w-full">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full text-orange-400 mb-4">
            <Coffee size={16} />
            <span className="text-sm font-medium">Cafe Owner Access</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Welcome Back to <span className="text-orange-400">CafeX</span>
          </h1>
          <p className="text-gray-400 mt-3">
            Access your cafe management dashboard to monitor operations, update menu items, and track performance.
          </p>
        </div>

        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@cafex.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-sm text-orange-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-400 focus:ring-orange-400"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
              Keep me signed in
            </label>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-base rounded-lg bg-orange-400 text-black hover:bg-orange-500 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>Processing...</>
            ) : (
              <>
                Access Dashboard <ArrowRight size={18} />
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Demo Access: owner@cafex.com / admin123</p>
            <p className="mt-2">Need technical support? <a href="/contact" className="text-orange-400 hover:underline">Contact IT Support</a></p>
          </div>
        </form>
      </div>
      
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-orange-500/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Key className="text-orange-400" />
              <h3 className="font-semibold">Secure Owner Portal</h3>
            </div>
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=2847&q=80"
              alt="Cafe Management"
              className="w-full h-auto rounded-lg object-cover aspect-[4/3] mb-4"
            />
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Sales analytics and reports</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Menu management system</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Staff scheduling tools</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                <span>Inventory control dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
