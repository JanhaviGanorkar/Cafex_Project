import React from 'react'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import About from '@/component/About/about';
import { Bell, Search, Home, Users, Info, Menu, Mail, X, FileText, Lock } from "lucide-react";

const navigation = [
  // { name: "Home", href: "/", icon: Home, requiresGuest: true },

  { name: "About", href: "/about", icon: Info },
  { name: "Privacy", href: "/privacy", icon: Lock, requiresGuest: true },
  
  // { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleNavigation = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <h1>Navbar</h1>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <nav className="hidden md:flex space-x-6">
            {navigation
              .filter(item => !item.requiresGuest || !isLoggedIn)
              .map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-1.5 text-sm text-primary'
                    : 'flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition'
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
    </div>
  )
}
