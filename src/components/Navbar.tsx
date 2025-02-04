import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/home" className="text-white transition duration-300">
            Awash Movies
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/home" className="hover:text-blue-500 transition duration-300">Home</Link>
          <Link to="/movies" className="hover:text-blue-500 transition duration-300">Movies</Link>
          <Link to="/tv-shows" className="hover:text-blue-500 transition duration-300">TV Shows</Link>
          <Link to="/profile" className="hover:text-blue-500 transition duration-300">Profile</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 bg-opacity-50 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Menu (Right Sidebar) */}
      <div
        className={`md:hidden fixed top-0 right-0 bg-gray-900 text-white w-64 h-full transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center pt-16 space-y-6">
          <Link to="/home" className="py-2 px-4 text-lg hover:bg-gray-700 transition duration-300" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/movies" className="py-2 px-4 text-lg hover:bg-gray-700 transition duration-300" onClick={toggleMobileMenu}>Movies</Link>
          <Link to="/tv-shows" className="py-2 px-4 text-lg hover:bg-gray-700 transition duration-300" onClick={toggleMobileMenu}>TV Shows</Link>
          <Link to="/profile" className="py-2 px-4 text-lg hover:bg-gray-700 transition duration-300" onClick={toggleMobileMenu}>Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
