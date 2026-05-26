import { useState, useRef, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

import jmjLogo from '../assets/JMJlogo.png';
import heroVideo from '../assets/hero.mp4';
import BlurText from './blurtext';
import Navigation from './navigation';
import { Facebook, Instagram } from 'lucide-react';

// FontAwesome local mapping for cart icon
const byPrefixAndName = {
  fat: {
    'cart-shopping': faShoppingCart
  }
};

const Hero: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // useScroll to track scroll progress of the hero section
  const { scrollYProgress, scrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Map scroll progress to vertical translation (parallax background and text exit)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Motion values for smooth custom video cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics for smooth interpolation
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoContainerRef.current) {
      const rect = videoContainerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  // GSAP micro-interaction for top-right shopping cart hover
  const handleCartMouseEnter = () => {
    if (cartRef.current) {
      gsap.to(cartRef.current, { y: -8, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleCartMouseLeave = () => {
    if (cartRef.current) {
      gsap.to(cartRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  // Scroll tracking for dynamic header colors and logo hiding
  const [isTopLight, setIsTopLight] = useState(false);
  const [isBottomLight, setIsBottomLight] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest: number) => {
      const ctaEl = document.getElementById('cta');
      const footerEl = document.getElementById('footer');

      if (ctaEl) {
        // Top icons (Menu, Shop) turn black when TOP of screen overlaps CTA
        setIsTopLight(latest + 60 >= ctaEl.offsetTop);

        // Bottom icon (Logo) turns black when BOTTOM of screen overlaps CTA
        setIsBottomLight(latest + window.innerHeight >= ctaEl.offsetTop);
      }

      if (footerEl) {
        // Hide bottom-left logo when it overlaps the footer
        setIsLogoHidden(latest + window.innerHeight >= footerEl.offsetTop);
      }
    });
  }, [scrollY]);

  // If the black sidebar is hovered OR the full menu is open, force the left-side icons to be white
  const forceWhiteLeftElements = isSidebarHovered || isOpen;
  const hamburgerBlack = forceWhiteLeftElements ? false : isTopLight;
  const logoBlack = forceWhiteLeftElements ? false : isBottomLight;
  const isMobile = window.innerWidth < 768;
  return (
    <div id="hero" ref={heroRef} className="w-full h-screen relative overflow-hidden font-sans select-none">

      {/* Full-Screen Navigation Overlay */}
      <Navigation isOpen={isOpen} setOpen={setOpen} />

      {/* Absolute Floating Global Shopping Cart Anchor (Top-Right) */}
      <div
        ref={cartRef}
        onMouseEnter={handleCartMouseEnter}
        onMouseLeave={handleCartMouseLeave}
        className={`fixed top-6 right-6 md:top-8 md:right-8 z-50 cursor-pointer flex items-center justify-center p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isTopLight ? 'bg-transparent border-[#111111] text-[#111111] hover:bg-[#111111]/10' : 'bg-[#111111]/30 border-white/20 text-white hover:bg-[#111111]/50'}`}
      >
        <FontAwesomeIcon icon={byPrefixAndName.fat['cart-shopping']} className="text-lg md:text-xl" />
      </div>

      {/* Main Split Grid/Flex Architecture */}
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 h-full w-full">

        {/* Left Column: Brand Narrative Layer */}
        <div className="bg-black relative flex flex-col justify-center pl-16 pr-8 pt-20 pb-20 md:pl-24 md:pr-20 md:pt-28 md:pb-28 h-[55vh] md:h-full w-full">

          {/* Interactive Sidebar Hover Area */}
          {!isMobile && (
            <div
              onMouseEnter={() => setIsSidebarHovered(true)}
              onMouseLeave={() => setIsSidebarHovered(false)}
              className={`fixed top-0 left-0 h-screen w-[72px] md:w-[88px] z-40 bg-[#111111] transition-transform duration-500 origin-left ${forceWhiteLeftElements ? 'scale-x-100' : 'scale-x-0'
                }`}
            />
          )}
          {/* Top-Left Hamburger menu */}
          <div
            className="fixed top-4 left-4 md:top-6 md:left-6 z-50 transition-colors duration-300"
            onMouseEnter={() => setIsSidebarHovered(true)}
            onMouseLeave={() => setIsSidebarHovered(false)}
          >

            <div
              className="fixed top-4 left-4 md:top-6 md:left-6 z-50 transition-colors duration-300"
              onMouseEnter={!isMobile ? () => setIsSidebarHovered(true) : undefined}
              onMouseLeave={!isMobile ? () => setIsSidebarHovered(false) : undefined}
            >
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                color={hamburgerBlack ? "#111111" : "#F4EFEA"}
                size={24}
              />
            </div>
          </div>

          {/* Heading Content Group (Main Heading and Subheading) with matching left border */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="border-l border-[#F4EFEA]/30 pl-3 md:pl-4 flex flex-col items-start justify-center w-full mt-6 md:mt-8"
          >

            {/* Top Subheading - now in-flow together with main heading */}
            <div className="text-[#F4EFEA] font-opensans tracking-widest text-sm sm:text-base md:text-lg uppercase leading-tight max-w-sm mb-4 md:mb-6">
              PROCESSED WITH <span className="text-[#A65F45] font-bold">PURPOSE</span> <br /> FROM FARM TO FLAVOR
            </div>

            <BlurText
              text="BOLD FLAVORS."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#F4EFEA] tracking-tight uppercase leading-none"
            />
            <BlurText
              text="MADE LOCAL."
              delay={300}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#F4EFEA] tracking-tight uppercase leading-none mt-2"
            />

            {/* Social Media Link Icons */}
            <div className="flex items-center space-x-4 mt-6 md:mt-8">
              <span className="text-[#F4EFEA]/60 font-opensans tracking-wider text-xs md:text-sm uppercase font-semibold">
                Follow Us
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61553588833117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4EFEA] hover:text-[#A65F45] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://www.instagram.com/beyondfood.ph?fbclid=IwY2xjawR8t0pleHRuA2FlbQIxMABicmlkETFiWnBhM1ZGV0xDaDJ3YUFRc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnub36T_PteXnVbEr_FguPGy-v64YPZFnSvVGFJFQH2NNXCzTnoW7N1YaOFd_aem_BXdW6kgFu70sUfeL1CFC3Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F4EFEA] hover:text-[#A65F45] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bottom-Left Brand Asset Anchor with white outline border wrap */}
          <div className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 transition-opacity duration-300 ${isLogoHidden && !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className={`border p-1 inline-block max-w-[50px] md:max-w-[60px] bg-transparent shadow-sm transition-colors duration-300 ${logoBlack ? 'border-[#111111]' : 'border-white'}`}>
              <img src={jmjLogo} alt="JMJ Logo" className={`w-full h-auto object-contain transition-all duration-300 ${logoBlack ? 'brightness-0' : 'brightness-0 invert'}`} />
            </div>
          </div>
        </div>

        {/* Right Column: Cinema/Video Matrix Layer */}
        <div
          ref={videoContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringVideo(true)}
          onMouseLeave={() => setIsHoveringVideo(false)}
          className="video-container-cursor-none relative h-[45vh] md:h-full w-full overflow-hidden bg-black select-none cursor-none"
        >
          {/* Parallax Wrapper for Video */}
          <motion.div
            style={{ y: yBg }}
            className="absolute inset-0 h-[120%] -top-[10%] w-full pointer-events-none"
          >
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Dark Overlay Layer for Premium Cinematic Look */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

          {/* Custom Contextual Play Cursor Modifier */}
          <motion.div
            className="absolute pointer-events-none z-30"
            style={{
              left: cursorX,
              top: cursorY,
              x: '-50%',
              y: '-50%',
            }}
            animate={{ scale: isHoveringVideo ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          >
            {/* Custom Deep Sage Circular Play Element with Soft Sand triangle icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-chili rounded-full flex items-center justify-center shadow-lg border border-white/20">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-[#D8CFC4] fill-current translate-x-[2px]" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
