import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import consumerImg from '../assets/img/consumer.jpg';
import farmersImg from '../assets/img/farmers.png';
import factoryImg from '../assets/factory.png';

// ─── Data ─────────────────────────────────────────────────────────────────────

const missionPages = [
  {
    label: 'Investors · Consumers',
    sections: [
      {
        title: 'Investors',
        items: [
          'Ensuring transparent, well-documented, government-compliant systems and reports.',
          'Maintaining strong relationships through open communication.',
          'Sustaining aggressiveness in terms of company growth.',
        ],
      },
      {
        title: 'Consumers',
        items: [
          'Guaranteeing the use of quality — clean, fresh, and finest raw materials for our food products.',
          'Producing flavorful food products that are readily available and have value for their money.',
        ],
      },
    ],
  },
  {
    label: 'Employees · Community',
    sections: [
      {
        title: 'Employees',
        items: [
          'Training and equipping with proper skills and knowledge.',
          'Adhering to standardized processes.',
          'Maintaining fair employee-employer relationship.',
          'Providing proper tools and equipment.',
          'Supporting employee innovation and creative ideas.',
        ],
      },
      {
        title: 'Community',
        items: [
          'Sourcing locally-grown materials.',
          'Providing livelihood for local residents within the production facility.',
          'Supporting zero-waste management and environmental sustainability initiative.',
        ],
      },
    ],
  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-3">
    <div className="w-10 h-px bg-[#A65F45]" />
    <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A65F45]">{children}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const WhatWeDo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [missionPage, setMissionPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Section 1: visible at start, fades & slides up by 0.25
  const s1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.33], [0, -80]);

  // Section 2: fades in 0.2→0.33, holds, fades out 0.55→0.66
  const s2Opacity = useTransform(scrollYProgress, [0.2, 0.33, 0.55, 0.66], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.2, 0.33, 0.66], [80, 0, -80]);

  // Section 3: fades in 0.55→0.66, stays
  const s3Opacity = useTransform(scrollYProgress, [0.55, 0.66, 1], [0, 1, 1]);
  const s3Y = useTransform(scrollYProgress, [0.55, 0.66], [80, 0]);

  const navigate = (next: number) => {
    setDirection(next > missionPage ? 1 : -1);
    setMissionPage(next);
  };

  const pageVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24 }),
  };

  return (
    <div
      id="whatwedo"
      ref={containerRef}
      className="relative h-[400vh] select-none font-sans"
      style={{ background: 'linear-gradient(to bottom, #111111, #1a1a1a, #111111)' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ═══════════════════════════════════════════
            SECTION 1 — What We Do Best
        ═══════════════════════════════════════════ */}
        <motion.section
          style={{ opacity: s1Opacity, y: s1Y }}
          className="absolute inset-0 flex flex-col justify-between px-8 pt-12 pb-12 sm:px-16 md:px-24 text-[#F4EFEA]"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src={consumerImg} alt="Consumer background" className="w-full h-full object-cover brightness-[0.25]" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #111 30%, rgba(17,17,17,0.5) 70%, transparent)' }} />
          </div>

          {/* Top: tag + body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 flex flex-col gap-4 max-w-lg"
          >
            <SectionTag>01 — What we do</SectionTag>
            <div className="w-8 h-px bg-[#F4EFEA]/20 mt-1" />
            <p className="font-opensans text-sm sm:text-base leading-[1.75] text-[#F4EFEA]/70 tracking-wide">
              We manufacture processed fruits and vegetables with precision and consistency.
              Our process blends industrial discipline with culinary intuition — serving restaurants,
              institutions, and modern Filipino kitchens with reliable quality at scale.
            </p>
          </motion.div>

          {/* Bottom: headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative z-10"
          >
            <h2 className="font-montserrat font-black text-[clamp(3rem,8vw,8rem)] tracking-[-0.03em] uppercase leading-[0.88] text-[#F4EFEA]">
              What we<br />do best.{' '}
              <span className="font-normal text-[0.8em] opacity-50 align-middle ml-2">→</span>
            </h2>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════
            SECTION 2 — Vision
        ═══════════════════════════════════════════ */}
        <motion.section
          style={{ opacity: s2Opacity, y: s2Y }}
          className="absolute inset-0 flex flex-col justify-between px-8 pt-12 pb-12 sm:px-16 md:px-24 text-[#F4EFEA]"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src={farmersImg} alt="Farmers background" className="w-full h-full object-cover brightness-[0.25]" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right, rgba(122,143,124,0.4), rgba(17,17,17,0.5), transparent)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #111 30%, transparent 70%)' }} />
          </div>

          {/* Top: tag + body */}
          <div className="relative z-10 flex flex-col gap-4 max-w-lg">
            <SectionTag>02 — Vision</SectionTag>
            <div className="w-8 h-px bg-[#F4EFEA]/20 mt-1" />
            <p className="font-opensans text-sm sm:text-base leading-[1.75] text-[#F4EFEA]/70 tracking-wide">
              To be a world-class and innovative company recognized for delivering high-quality
              food products that are the preferred choice of consumers every day, everywhere.
              We aim to enrich lives through excellence, continuous improvement, and a commitment
              to customer satisfaction and sustainable growth.
            </p>
          </div>

          {/* Bottom: headline */}
          <div className="relative z-10">
            <h2 className="font-montserrat font-black text-[clamp(3rem,8vw,8rem)] tracking-[-0.03em] uppercase leading-[0.88] text-[#F4EFEA]">
              Vision
            </h2>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════
            SECTION 3 — Mission
        ═══════════════════════════════════════════ */}
        <motion.section
          style={{ opacity: s3Opacity, y: s3Y }}
          className="absolute inset-0 flex flex-col justify-between px-8 pt-12 pb-12 sm:px-16 md:px-24 text-[#F4EFEA]"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src={factoryImg} alt="Factory background" className="w-full h-full object-cover brightness-[0.25]" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom left, rgba(166,95,69,0.4), rgba(17,17,17,0.5), transparent)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #111 30%, transparent 70%)' }} />
          </div>

          {/* Top: tag + interactive mission block */}
          <div className="relative z-10 flex flex-col gap-4 max-w-2xl pointer-events-auto">
            <SectionTag>03 — Mission</SectionTag>
            <div className="w-8 h-px bg-[#F4EFEA]/20 mt-1 mb-1" />

            <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#A65F45]">
              JMJ is committed to our stakeholders by:
            </p>

            {/* Animated page */}
            <div className="min-h-[210px] sm:min-h-[190px] relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={missionPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {missionPages[missionPage].sections.map((section) => (
                    <div key={section.title}>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#F4EFEA]/85">
                          {section.title}
                        </span>
                        <div className="flex-1 h-px bg-[#F4EFEA]/10" />
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-2.5 text-xs sm:text-sm leading-[1.65] text-[#F4EFEA]/60">
                            <span className="font-mono text-[10px] text-[#A65F45]/70 mt-px shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => navigate(missionPage - 1)}
                disabled={missionPage === 0}
                aria-label="Previous"
                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition-all
                  ${missionPage === 0
                    ? 'border-[#F4EFEA]/10 text-[#F4EFEA]/20 cursor-not-allowed'
                    : 'border-[#F4EFEA]/25 text-[#F4EFEA]/55 hover:border-[#F4EFEA]/70 hover:text-[#F4EFEA] cursor-pointer'
                  }`}
              >←</button>

              <div className="flex gap-1.5 items-center">
                {missionPages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i)}
                    aria-label={`Page ${i + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer
                      ${i === missionPage
                        ? 'w-4 h-1.5 bg-[#A65F45]'
                        : 'w-1.5 h-1.5 bg-[#F4EFEA]/25 hover:bg-[#F4EFEA]/50'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(missionPage + 1)}
                disabled={missionPage === missionPages.length - 1}
                aria-label="Next"
                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm transition-all
                  ${missionPage === missionPages.length - 1
                    ? 'border-[#F4EFEA]/10 text-[#F4EFEA]/20 cursor-not-allowed'
                    : 'border-[#F4EFEA]/25 text-[#F4EFEA]/55 hover:border-[#F4EFEA]/70 hover:text-[#F4EFEA] cursor-pointer'
                  }`}
              >→</button>

              <span className="font-mono text-[10px] tracking-widest text-[#F4EFEA]/25 uppercase ml-1 hidden sm:inline">
                {missionPages[missionPage].label}
              </span>
            </div>
          </div>

          {/* Bottom: headline */}
          <div className="relative z-10">
            <h2 className="font-montserrat font-black text-[clamp(3rem,8vw,8rem)] tracking-[-0.03em] uppercase leading-[0.88] text-[#F4EFEA]">
              Mission
            </h2>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default WhatWeDo;