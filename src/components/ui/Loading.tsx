import { motion, type Variants } from "framer-motion";

const pulseVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [1, 1.2, 1], // keyframes
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const, // fix TS type
    },
  },
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-orange-500"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        />
      </div>
      <p className="mt-6 text-2xl font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
