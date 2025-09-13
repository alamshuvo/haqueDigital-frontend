import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-800 text-white py-6 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
            <Link to={"/"}>
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-shrink-0 text-3xl font-extrabold text-white tracking-wide italic"
          >
            Digital <span className='text-2xl font-extralight italic text-orange-500'>Hotel</span>
          </motion.div>
        </Link>
          <p className="text-sm text-white/90">
            Providing comfort and luxury for every guest.
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="/" className="text-orange-500 hover:text-white transition-colors">
            Home
          </a>
          <a href="/rooms" className="text-orange-500 hover:text-white transition-colors">
            Rooms
          </a>
          
          <a href="/contact" className="text-orange-500 hover:text-white transition-colors">
            Contact
          </a>
          <a href="/booking-summary" className="text-orange-500 hover:text-white transition-colors">
            Bookings Summary 
          </a>
        </div>

        <div className="text-center md:text-right text-sm text-orange-500">
          &copy; {new Date().getFullYear()} Hotel Digital. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
