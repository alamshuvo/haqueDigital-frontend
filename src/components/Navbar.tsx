import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

// Tailwind CSS is assumed to be available.

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Variants for the main navbar animation
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Variants for the mobile menu links
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-lg font-medium transition duration-300 ease-in-out hover:text-orange-500
    ${isActive ? "text-orange-500 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 after:scale-x-100" : "text-gray-200 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 after:scale-x-0"}
    hover:after:w-full hover:after:scale-x-100`;

  return (
    <motion.nav
      className="bg-gray-800 shadow-lg"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
        <Link to="/">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-shrink-0 text-3xl font-extrabold text-white tracking-wide italic"
          >
            Digital <span className='text-2xl font-extralight italic text-orange-500'>Hotel</span>
          </motion.div>
        </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/rooms" className={linkClass}>
              Rooms 
            </NavLink>
            <NavLink to="/create-room" className={linkClass}>
              Create Room
            </NavLink>
            <NavLink to="/booking-summary" className={linkClass}>
              Booking Summary
            </NavLink>
          </div>

          {/* Contact Button - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden md:flex"
          >
            <Link
              to="/contact"
              className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-md
                         hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
            >
              Contact
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              <motion.div variants={mobileLinkVariants}>
                <NavLink to="/rooms" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" onClick={toggleMobileMenu}>
                  Rooms
                </NavLink>
              </motion.div>
              <motion.div variants={mobileLinkVariants}>
                <NavLink to="/create-room" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" onClick={toggleMobileMenu}>
                  Create Room
                </NavLink>
              </motion.div>
              <motion.div variants={mobileLinkVariants}>
                <NavLink to="/booking-summary" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700" onClick={toggleMobileMenu}>
                  Booking Summary
                </NavLink>
              </motion.div>
              <motion.div variants={mobileLinkVariants}>
                <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-orange-500 hover:bg-gray-700" onClick={toggleMobileMenu}>
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
