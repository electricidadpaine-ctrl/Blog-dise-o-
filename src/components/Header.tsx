import React, { useState } from "react";
import { Search, Menu, X, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSubscribe: () => void;
}

export default function Header({ currentCategory, onSelectCategory, onOpenSubscribe }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems = [
    { label: "Latest", category: "all" },
    { label: "IoT", category: "DOMÓTICA" },
    { label: "Automation", category: "AUTOMATIZACIÓN" },
    { label: "Safety", category: "SEGURIDAD DIGITAL" },
    { label: "Services", category: "services" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left/Center: Logo */}
        <div 
          onClick={() => onSelectCategory("all")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative w-9 h-9 bg-slate-blue rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {/* Geometric custom high-voltage design using CSS */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-blue to-slate-blue-light animate-pulse opacity-70"></div>
            <span className="relative text-electric-gold font-sans font-extrabold text-lg tracking-tighter">EP</span>
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-xl text-slate-blue tracking-tight flex items-center">
              Electricidad Paine <span className="text-gray-400 font-normal ml-1.5 text-base tracking-normal">Insights</span>
            </h1>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const isActive = currentCategory === item.category;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onSelectCategory(item.category);
                  setMobileMenuOpen(false);
                }}
                className={`font-sans text-[13px] font-semibold tracking-wider uppercase transition-all pb-1 border-b-2 cursor-pointer ${
                  isActive 
                    ? "text-slate-blue border-electric-gold" 
                    : "text-gray-500 border-transparent hover:text-slate-blue"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + Subscribe */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-slate-blue mr-2 font-sans"
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-500 hover:text-slate-blue transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onOpenSubscribe}
            className="cursor-pointer bg-slate-blue hover:bg-slate-blue-light text-white text-[12px] font-bold py-2.5 px-6 rounded-md uppercase tracking-wider transition-all hover:shadow-xs active:scale-95"
          >
            Subscribe
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 text-gray-500 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-500 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search input */}
      {searchOpen && (
        <div className="px-4 py-2 bg-gray-50 md:hidden border-b border-gray-100">
          <input
            type="text"
            placeholder="Buscar en Electricidad Paine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-slate-blue bg-white font-sans"
          />
        </div>
      )}

      {/* Mobile Menu Draw */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectCategory(item.category);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left font-sans text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-slate-blue py-2.5 border-b border-gray-50"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSubscribe();
                  }}
                  className="w-full bg-slate-blue text-white text-xs font-bold py-3 rounded-lg uppercase tracking-wider text-center block"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
