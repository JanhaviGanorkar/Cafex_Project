import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
// components/Footer.jsx
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-orange-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-orange-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-orange-400 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-orange-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-orange-400 hover:text-white">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Button className="px-6 py-2 rounded-full bg-orange-400 text-black hover:bg-orange-500 transition">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
