
import { motion } from 'framer-motion';
import jmjLogo from '../assets/JMJlogo.png';

interface PreloaderProps {
  progress: number;
}

const Preloader: React.FC<PreloaderProps> = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] w-full h-screen bg-[#111111] flex flex-col items-center justify-center select-none"
    >
      <div className="relative w-24 md:w-32 h-auto flex flex-col items-center">
        {/* Base Grey Logo */}
        <img
          src={jmjLogo}
          alt="Loading Background"
          className="w-full h-auto object-contain opacity-20 grayscale"
        />

        {/* White Overlay Logo using clip-path */}
        <img
          src={jmjLogo}
          alt="Loading Progress"
          className="absolute inset-0 w-full h-auto object-contain brightness-0 invert"
          style={{
            clipPath: `inset(${100 - progress}% 0 0 0)`,
            transition: 'clip-path 0.2s ease-out'
          }}
        />
      </div>

      {/* Optional minimal percentage text underneath */}
      <div className="absolute bottom-12 md:bottom-16 text-[#F4EFEA]/30 font-opensans tracking-widest text-xs md:text-sm uppercase">
        Loading {progress}%
      </div>
    </motion.div>
  );
};

export default Preloader;
