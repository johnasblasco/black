import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Core values data
const coreValuesData = [
  {
    id: "01",
    title: "Commitment",
    text: "Commitment is our pledge to our stakeholders in doing business with them. It is giving consistent high-grade quality products in a timely manner that are beneficial to all our stakeholders."
  },
  {
    id: "02",
    title: "Integrity",
    text: "We value our relationship with our stakeholders that is why we provide accurate, honest, relevant information."
  },
  {
    id: "03",
    title: "Quality",
    text: "We ensure our consumers that we use clean, fresh, and finest raw materials to all food products and that they are readily available to all distribution channels. (Retail, online, industrial)"
  },
  {
    id: "04",
    title: "Love",
    text: "We take responsibility in the development of our employees through proper training in the pursuit of providing better quality products, greater opportunities for self-enrichment, and stronger employee engagement."
  },
  {
    id: "05",
    title: "Resilience",
    text: "We exercise flexibility and adaptability to address business dynamics to efficiently enable us to fuel company growth, to continuously delight our consumers and to upgrade our employees' skills."
  }
];

const CoreValues: React.FC = () => {
  const [page, setPage] = useState(1);

  const isPage1 = page === 1;

  const currentValues = isPage1
    ? coreValuesData.slice(0, 3)
    : coreValuesData.slice(3, 5);

  return (
    <section
      id="core-values"
      className="relative w-full bg-black text-[#F4EFEA] py-16 md:py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* subtle bg accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#A65F45]/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
        <div>
          <span className="uppercase tracking-[0.25em] text-xs text-[#F4EFEA]/60 font-semibold">
            What We Stand For
          </span>

          <h2 className="mt-3 text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-bold tracking-tight leading-none">
            CORE VALUES
          </h2>
        </div>

        {/* Bottom Right Navigation */}
        <div className="relative z-10 flex justify-end mt-14">
          <div className="flex items-center gap-3">

            {/* Previous */}
            <div className="relative group">
              <button
                onClick={() => setPage(1)}
                disabled={isPage1}
                aria-label="Previous"
                className={`w-11 h-11 flex items-center justify-center rounded-full border text-sm transition-all duration-300
          ${isPage1
                    ? 'border-white/10 text-white/15 cursor-not-allowed'
                    : 'border-white/80 text-white hover:bg-white hover:text-black cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                  }`}
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                  ←
                </span>
              </button>

              {!isPage1 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <div className="relative px-4 py-2 rounded-xl bg-white text-black text-[10px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap shadow-2xl border border-black/10">
                    Return to first values

                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                  </div>
                </div>
              )}
            </div>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {[1, 2].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-label={`Page ${p}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer
            ${page === p
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>

            {/* Next */}
            <div className="relative group">
              <button
                onClick={() => setPage(2)}
                disabled={!isPage1}
                aria-label="Next"
                className={`w-11 h-11 flex items-center justify-center rounded-full border text-sm transition-all duration-300
          ${!isPage1
                    ? 'border-white/10 text-white/15 cursor-not-allowed'
                    : 'border-white/80 text-white hover:bg-white hover:text-black cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                  }`}
              >
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </button>

              {isPage1 && (
                <div className="absolute bottom-full right-0 mb-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <div className="relative px-4 py-2 rounded-xl bg-white text-black text-[10px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap shadow-2xl border border-black/10">
                    View remaining values

                    <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white rotate-45" />
                  </div>
                </div>
              )}
            </div>

            {/* Label */}
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.24em] uppercase text-white ml-2">
              {isPage1
                ? 'Commitment · Integrity · Quality'
                : 'Love · Resilience'}
            </span>

          </div>
        </div>


      </div>

      {/* Cards */}
      <div className="relative z-10 min-h-[450px] md:min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`grid gap-6 md:gap-8 ${currentValues.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-3'
              }`}
          >
            {currentValues.map((value) => (
              <motion.div
                key={value.id}
                transition={{ duration: 0.25 }}
                className="group relative transition-all duration-300"
              >
                {/* top line */}
                <div className="w-12 h-px  group-hover:w-20  transition-all duration-300" />

                {/* number */}
                <div className="text-lg md:text-xl text-[#F4EFEA]/45 font-light mb-8">
                  {value.id}
                </div>

                {/* title */}
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-2xl md:text-3xl font-montserrat font-bold leading-tight">
                    {value.title}
                  </h3>

                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white text-xl">
                    →
                  </span>
                </div>

                {/* text */}
                <p className="text-sm sm:text-base leading-relaxed text-[#F4EFEA]/80">
                  {value.text}
                </p>

                {/* glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent opacity-0  transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>


    </section>
  );
};

export default CoreValues;