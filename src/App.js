import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wifi, Code, Menu, X, ArrowRight, ArrowDown, ArrowLeft, Star, AlignLeft, Sparkles, QrCode, Flame, FileText, MoreHorizontal, Wrench } from 'lucide-react';
import axios from 'axios';
import FindMyIP from './components/findmyip/FindMyIP';
import Beautifier from './components/beautifier/Beautifier';
import WordCount from './components/wordcount/WordCount';
import QRCodeGenerator from './components/qrgen/QRCodeGenerator';
import FuelBillGenerator from './components/fuelbill/FuelBillGenerator';
import RentReceiptPage from './components/rentreceipt/RentReceiptPage';
import GarageBillPage from './components/garagebill/GarageBillPage';
import './App.css';


// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const App = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [billDropdownOpen, setBillDropdownOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Navigation */}
        <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                  <Code className="text-black" size={20} />
                </div>
                <span className="text-2xl font-light tracking-wide text-white">DevTools</span>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <NavItem icon={Wifi} label="FindMyIP" to="/ipinfo" />
                  <NavItem icon={Sparkles} label="Beautifier" to="/beautifier" />
                  <NavItem icon={AlignLeft} label="Word Count" to="/wordlycount" />
                  <NavItem icon={QrCode} label="QR Generator" to="/qr-generator" />
                  {/* More Dropdown */}
                  <div className="relative group">
                    <button
                      className="flex items-center space-x-2 px-6 py-3 rounded-full text-gray-300 hover:text-white transition-all duration-500 font-medium"
                      onClick={() => setBillDropdownOpen((open) => !open)}
                      onBlur={() => setTimeout(() => setBillDropdownOpen(false), 200)}
                    >
                      <MoreHorizontal size={18} />
                      <span>More</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {(billDropdownOpen) && (
                      <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-50 py-2">
                        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Bill Tools</div>
                        <Link to="/fuel-bill" className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium flex items-center gap-2" onClick={() => setBillDropdownOpen(false)}>
                          <Flame size={16} className="text-orange-500" /> Fuel Bill
                        </Link>
                        <Link to="/rent-receipt" className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium flex items-center gap-2" onClick={() => setBillDropdownOpen(false)}>
                          <FileText size={16} className="text-green-600" /> Rent Receipt
                        </Link>
                        <Link to="/garage-bill" className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium flex items-center gap-2" onClick={() => setBillDropdownOpen(false)}>
                          <Wrench size={16} className="text-blue-600" /> Garage Bill Generator
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  className="p-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
                  onClick={() => setMobileNavOpen((open) => !open)}
                  aria-label="Open navigation menu"
                >
                  {mobileNavOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
            {/* Mobile Nav Drawer */}
            {mobileNavOpen && (
              <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 border-b border-white/10 shadow-lg flex flex-col items-center py-6 space-y-4 z-50">
                <Link to="/ipinfo" className="text-lg font-medium text-white hover:text-blue-400 flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
                  <Wifi size={18} /> FindMyIP
                </Link>
                <Link to="/beautifier" className="text-lg font-medium text-white hover:text-purple-400 flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
                  <Sparkles size={18} /> Beautifier
                </Link>
                <Link to="/wordlycount" className="text-lg font-medium text-white hover:text-green-400 flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
                  <AlignLeft size={18} /> Word Count
                </Link>
                <Link to="/qr-generator" className="text-lg font-medium text-white hover:text-cyan-400 flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
                  <QrCode size={18} /> QR Generator
                </Link>
                {/* More Dropdown for mobile */}
                <div className="w-full flex flex-col items-center px-6">
                  <div className="text-white font-semibold text-base flex items-center gap-2 mt-2 mb-1 justify-center"><MoreHorizontal size={18} /> More</div>
                  <div className="w-full">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 pt-2 pb-1">Bill Tools</div>
                    <Link to="/fuel-bill" className="text-white text-sm font-medium flex items-center gap-2 py-1 hover:text-orange-400 justify-center" style={{ width: '100%' }} onClick={() => setMobileNavOpen(false)}>
                      <Flame size={16} className="text-orange-500" /> Fuel Bill
                    </Link>
                    <Link to="/rent-receipt" className="text-white text-sm font-medium flex items-center gap-2 py-1 hover:text-green-400 justify-center" style={{ width: '100%' }} onClick={() => setMobileNavOpen(false)}>
                      <FileText size={16} className="text-green-400" /> Rent Receipt
                    </Link>
                    <Link to="/garage-bill" className="text-white text-sm font-medium flex items-center gap-2 py-1 hover:text-blue-400 justify-center" style={{ width: '100%' }} onClick={() => setMobileNavOpen(false)}>
                      <Wrench size={16} className="text-blue-400" /> Garage Bill
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.nav>
        {/* Main Content */}
        <main className="pt-20 px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ipinfo" element={<FindMyIP />} />
              <Route path="/beautifier" element={<Beautifier />} />
              <Route path="/wordlycount" element={<WordCount />} />
              <Route path="/qr-generator" element={<QRCodeGenerator />} />
              <Route path="/fuel-bill" element={<FuelBillGenerator />} />
              <Route path="/rent-receipt" element={<RentReceiptPage />} />
              <Route path="/garage-bill" element={<GarageBillPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </main>
        {/* Footer */}
        <motion.footer className="border-t border-white/10 mt-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-gray-400 font-light">Crafted with precision • Modern Developer Experience</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </Router>
  );
};

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);
  return (
  <div className="relative overflow-hidden">
    {/* Static background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="homepage-bg" />
      <div className="homepage-bg2" />
    </div>

    <div className="relative z-10 space-y-20">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-2 md:space-y-8 md:pt-8 ">
        <div className="inline-flex items-center space-x-2 bg-black/80 md:bg-black/60 border-2 border-white/20 rounded-full px-4 py-2 text-xs md:text-sm font-bold shadow-lg mx-auto w-max mt-10 md:mt-3 text-white premium-badge">
          <Star size={14} className="text-yellow-400" />
          <span>Premium Developer Tools</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-7xl md:text-8xl font-light tracking-tight text-white leading-tight md:leading-none">
          Dev
          <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-extralight">
            Toolbox
          </span>
        </h1>
        <p className="text-base md:text-xl text-gray-400 max-w-xs md:max-w-2xl mx-auto leading-relaxed font-light">
          Crafted tools for the modern developer. 
          <br />
          Elegant, fast, and built to perfection.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <Link to="/ipinfo">
            <motion.button 
              className="group relative inline-flex items-center space-x-2 md:space-x-3 bg-white text-black px-5 py-3 md:px-8 md:py-4 rounded-full font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 overflow-hidden text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative z-10">Get Started</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-xs md:max-w-6xl mx-auto px-2 md:px-0 items-start">
        <div className="group">
          <motion.div 
            className="relative h-64 md:h-96 bg-gradient-to-br from-blue-500/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3 md:space-y-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Wifi className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">FindMyIP</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                    Unveil your digital fingerprint with comprehensive network analysis and geolocation insights.
                  </p>
                </div>
              </div>
              
              <Link to="/ipinfo">
                <motion.button
                  className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-blue-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore Tool</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="group">
          <motion.div 
            className="relative h-64 md:h-96 bg-gradient-to-br from-purple-500/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3 md:space-y-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">Beautifier</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                    Transform chaotic code into pristine, readable masterpieces with intelligent formatting.
                  </p>
                </div>
              </div>
              <Link to="/beautifier">
                <motion.button
                  className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-purple-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore Tool</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="group">
          <motion.div 
            className="relative h-64 md:h-96 bg-gradient-to-br from-green-400/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3 md:space-y-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <AlignLeft className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">Word Count</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                    Instantly count words, characters, sentences, and more. Perfect for writers, students, and professionals.
                  </p>
                </div>
              </div>
              <Link to="/wordlycount">
                <motion.button
                  className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-green-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore Tool</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="group">
          <motion.div 
            className="relative h-64 md:h-96 bg-gradient-to-br from-cyan-400/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3 md:space-y-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <QrCode className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">QR Code Generator</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                    Instantly create and download QR codes for any text or URL. Fast, beautiful, and private.
                  </p>
                </div>
              </div>
              <Link to="/qr-generator">
                <motion.button
                  className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-cyan-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore Tool</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="group">
          <motion.div 
            className="relative h-64 md:h-96 bg-gradient-to-br from-orange-400/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3 md:space-y-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Flame className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">Fuel Bill Generator</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                    Create, preview, and print professional fuel bills and receipts. Modern, fast, and customizable.
                  </p>
                </div>
              </div>
              <Link to="/fuel-bill">
                <motion.button
                  className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-orange-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore Tool</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
          {/* Show More Button and Hidden Tools */}
          {!showMore && (
            <div className="flex items-center mt-0 md:mt-0 ml-2 cursor-pointer text-white font-light text-base hover:underline" style={{ alignSelf: 'center' }} onClick={() => setShowMore(true)}>
              <span>Show More</span>
              <ArrowRight size={18} className="ml-1" />
            </div>
          )}
          {showMore && (
            <>
              <div className="group">
                <motion.div 
                  className="relative h-64 md:h-96 bg-gradient-to-br from-green-400/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="space-y-3 md:space-y-6">
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <FileText className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">Rent Receipt Generator</h3>
                        <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                          Generate, preview, and print professional rent receipts for tenants and landlords. Simple, fast, and customizable.
                        </p>
                      </div>
                    </div>
                    <Link to="/rent-receipt">
                      <motion.button
                        className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-green-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore Tool</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="group">
                <motion.div 
                  className="relative h-64 md:h-96 bg-gradient-to-br from-blue-400/5 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/5 overflow-hidden"
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="space-y-3 md:space-y-6">
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Wrench className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-3xl font-light text-white mb-2 md:mb-3">Garage Bill Generator</h3>
                        <p className="text-gray-400 leading-relaxed font-light text-xs md:text-base">
                          Create, preview, and print professional garage bills and invoices. Modern, fast, and customizable.
                        </p>
                      </div>
                    </div>
                    <Link to="/garage-bill">
                      <motion.button
                        className="group/btn inline-flex items-center space-x-1 md:space-x-2 text-white font-medium hover:text-blue-400 transition-colors duration-300 text-xs md:text-base px-3 py-2 md:px-5 md:py-3 rounded-full"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore Tool</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="flex items-center mt-0 md:mt-0 ml-2 cursor-pointer text-white font-light text-base hover:underline" style={{ alignSelf: 'center' }} onClick={() => setShowMore(false)}>
                <span>Show Less</span>
                <ArrowLeft size={18} className="ml-1" />
              </div>
            </>
          )}
      </div>

      {/* DevTools Description Section */}
      <div className="text-center space-y-4 px-2 md:px-0 py-2 md:py-4">
        <h2 className="text-lg sm:text-xl md:text-4xl font-light text-white">What is DevTools?</h2>
        <p className="text-xs sm:text-sm md:text-lg text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed font-light">
          DevTools is your all-in-one suite for modern developers, offering powerful utilities like FindMyIP, Beautifier, Word Count, QR Code Generator, <b>Fuel Bill Generator</b>, <b>Rent Receipt Generator</b>, and <b>Garage Bill Generator</b>.<br /><br />
          Effortlessly analyze your network, format your code, count words and characters, and create custom QR codes. Generate, preview, and print professional fuel bills, rent receipts, and garage bills with modern, customizable templates—all in a beautiful, responsive interface. Whether you're debugging, learning, or building, DevTools is crafted to make your workflow seamless and enjoyable on any device.
        </p>
      </div>
    </div>
  </div>
);
};

const NavItem = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`group relative flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-500 overflow-hidden ${isActive ? 'text-black bg-white shadow-lg' : 'text-gray-300 hover:text-white'}`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform transition-transform duration-500 ${isActive ? 'translate-x-0' : 'translate-x-full group-hover:translate-x-0'}`} />
      <Icon size={18} className="relative z-10" />
      <span className="font-medium relative z-10 tracking-wide">{label}</span>
    </Link>
  );
};

export default App; 