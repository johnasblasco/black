

const CTA: React.FC = () => {
  return (
    <section id="cta" className="w-full bg-[#F4EFEA] text-[#111111] py-24 md:py-32 px-6 md:px-16 lg:px-24 font-sans border-t border-[#111111]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Left Column: Huge Headline */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-montserrat font-bold tracking-tight leading-[1.1]">
            Join our mailing list.
          </h2>
        </div>

        {/* Right Column: Form */}
        <div className="flex flex-col max-w-lg">
          <p className="text-base sm:text-lg md:text-xl font-opensans leading-relaxed text-[#111111]/80 mb-12">
            Saving the planet starts at the table. Join our email list and stay involved.
          </p>

          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email here"
              required
              className="w-full bg-transparent border-b border-[#111111]/30 focus:border-[#111111] outline-none py-4 text-base md:text-lg text-[#111111] placeholder-[#111111]/40 transition-colors font-opensans"
            />

            {/* Privacy Checkbox */}
            <label className="flex items-start gap-4 mt-8 cursor-pointer group">
              <input
                type="checkbox"
                required
                className="mt-1 w-5 h-5 border-[#111111]/30 rounded-sm bg-transparent cursor-pointer"
              />
              <span className="text-sm font-opensans text-[#111111]/70 leading-relaxed group-hover:text-[#111111] transition-colors">
                By subscribing, you confirm you have read and accept our privacy policy.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-12 self-start font-montserrat font-bold text-lg flex items-center gap-2 text-[#111111] hover:text-[#A65F45] transition-colors group"
            >
              Subscribe
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default CTA;
