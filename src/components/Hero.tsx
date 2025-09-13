import { useState } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// This is the main component.
export const Hero = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      } as const,
    },
  };

  return (
    <div
      className="relative h-screen overflow-hidden bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url('https://quitenicestuff.com/demos/sohohotel/site1/wp-content/uploads/2024/06/05.jpg')`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-40 "></div>

      {/* Main Content with Animation */}
      <motion.div
        className="relative z-10 flex flex-col items-start justify-center  h-full p-8 md:p-16 lg:p-24 pb-[150px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={textVariants}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Convenient City Location
          </h1>
        </motion.div>
        <motion.div variants={textVariants}>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8 opacity-90 drop-shadow-lg">
            Luxurious Hotel Experience
          </h2>
        </motion.div>

        <div className="flex space-x-4">
         <Link to={"/contact"}
         >
         <motion.button
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors"
            variants={textVariants}
          >
            Contact Us
          </motion.button>
         </Link>
          <Link to={"/rooms"}>
          <motion.button
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors"
            variants={textVariants}
          >
            View Rooms
          </motion.button>
          </Link>
        </div>
      </motion.div>
      {/* Booking Bar with Animation */}
      <motion.div
  className="absolute bottom-0 left-0 right-0 z-20 bg-white/20 backdrop-blur-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-0 sm:space-x-4 border-t border-white/30"
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    duration: 0.8,
    delay: 1.5,
    type: "spring",
    stiffness: 100,
  }}
>
  {/* Check In */}
  <div className="hidden sm:flex flex-1 items-center space-x-2 text-white w-full">
    <i className="fa-solid fa-calendar-days text-xl opacity-80"></i>
    <div className="w-full">
      <label htmlFor="check-in" className="block text-xs uppercase opacity-70">
        Check In
      </label>
      <input
        type="text"
        id="check-in"
        placeholder="dd/mm/yyyy"
        className="w-full bg-transparent border-none outline-none placeholder-white placeholder-opacity-70 px-2 py-1"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
    </div>
  </div>

  {/* Check Out */}
  <div className="hidden sm:flex flex-1 items-center space-x-2 text-white w-full">
    <i className="fa-solid fa-calendar-days text-xl opacity-80"></i>
    <div className="w-full">
      <label htmlFor="check-out" className="block text-xs uppercase opacity-70">
        Check Out
      </label>
      <input
        type="text"
        id="check-out"
        placeholder="dd/mm/yyyy"
        className="w-full bg-transparent border-none outline-none placeholder-white placeholder-opacity-70 px-2 py-1"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
    </div>
  </div>

  {/* Guests */}
  <div className="hidden sm:flex flex-1 items-center space-x-2 text-white w-full">
    <i className="fa-solid fa-user-group text-xl opacity-80"></i>
    <div className="w-full">
      <label htmlFor="guests" className="block text-xs uppercase opacity-70">
        Guests
      </label>
      <input
        type="number"
        id="guests"
        className="w-full bg-transparent border-none outline-none px-2 py-1"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
      />
    </div>
  </div>

  {/* Book Now */}
  <Link to={"/rooms"} className="w-full sm:w-auto">
    <button className="bg-orange-500 hover:bg-orange-900 text-white font-semibold py-4 px-8 rounded-md transition-colors w-full sm:w-auto">
      Book Now
    </button>
  </Link>
</motion.div>

    </div>
  );
};
