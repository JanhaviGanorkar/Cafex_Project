import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // If using React Router

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // optional

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@demo.com" && password === "123456") {
      setError("");
      localStorage.setItem("isAuthenticated", "true"); // Simulate auth
      navigate("/cart"); // Redirect to homepage or dashboard
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <section
      id="login"
      className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 pt-32 bg-black text-white"
    >
      <div className="space-y-6 max-w-xl">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Login to <span className="text-orange-400">Your Account</span>
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm text-orange-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full py-3 text-lg rounded-full text-orange-400 bg-gray-900 hover:bg-orange-400 hover:text-black transition"
          >
            Log In <ArrowRight className="ml-2" size={18} />
          </Button>
        </form>
      </div>
      <div className="w-full max-w-md">
        <img
          src="https://via.placeholder.com/500x500"
          alt="Login Hero"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
