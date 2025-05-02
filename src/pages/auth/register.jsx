// components/Register.jsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Register() {
  return (
    <section
      id="register"
      className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 pt-32 bg-black text-white"
    >
      <div className="space-y-6 max-w-xl">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          Create a <span className="text-orange-400">New Account</span>
        </h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              placeholder="Create a password"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Agree to Terms and Conditions
            </label>
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-lg rounded-full text-orange-400 bg-gray-900 hover:bg-orange-400 hover:text-black transition"
          >
            Sign Up <ArrowRight className="ml-2" size={18} />
          </Button>
        </form>
      </div>
      <div className="w-full max-w-md">
        <img
          src="https://via.placeholder.com/500x500" // You can replace this with a hero image if needed
          alt="Register Hero"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
