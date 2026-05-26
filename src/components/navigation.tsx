import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const navLinks = [
  { name: 'Home', id: 'hero', index: 0 },
  { name: 'What we do', id: 'whatwedo', index: 0 },
  { name: 'Vision', id: 'whatwedo', index: 1 },
  { name: 'Mission', id: 'whatwedo', index: 2 },
  { name: 'Core values', id: 'core-values', index: 0 }
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, setOpen }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScrollTo = (id: string, index: number) => {
    setOpen(false); // Close menu first

    // Wait for the slide animation (0.6s) to finish before scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        if (index === 1) {
          // Vision is panel 2 of 3 in the 300vh container
          window.scrollTo({ top: el.offsetTop + window.innerHeight, behavior: 'smooth' });
        } else if (index === 2) {
          // Mission is panel 3 of 3 in the 300vh container
          window.scrollTo({ top: el.offsetTop + window.innerHeight * 2, behavior: 'smooth' });
        } else {
          // Standard scroll
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={isMobile ? { x: 0, y: '-100%' } : { x: '-100%', y: 0 }}
          animate={{ x: 0, y: 0 }}
          exit={isMobile ? { x: 0, y: '-100%' } : { x: '-100%', y: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#111111] z-[45] overflow-y-auto font-montserrat"
        >
          <div className="min-h-[100svh] flex flex-col items-center justify-center py-24 sm:py-32 w-full">
            <div className="flex flex-col items-start justify-center gap-6 sm:gap-8 max-w-5xl w-full px-8 sm:px-12 md:px-32">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={isMobile ? { opacity: 0, y: -30 } : { opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={isMobile ? { opacity: 0, y: -30 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="group cursor-pointer flex items-center justify-between w-full"
                  onClick={() => handleScrollTo(link.id, link.index)}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4EFEA] group-hover:text-[#A65F45] transition-colors leading-tight tracking-tighter">
                    {link.name}
                  </h2>

                  {/* Downward arrow always visible */}
                  <div className="text-[#F4EFEA] ml-6 group-hover:text-[#A65F45] transition-all duration-300 group-hover:translate-y-1">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
