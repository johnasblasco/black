import { useState, useEffect } from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import WhatWeDo from "../components/whatwedo";
import CoreValues from "../components/corevalues";
import CTA from "../components/cta";
import Footer from "../components/footer";
import Preloader from "../components/preloader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state with HTML document element class list
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  useEffect(() => {
    // Collect all images and videos mounted in the DOM
    const images = Array.from(document.images);
    const videos = Array.from(document.querySelectorAll('video'));
    const totalAssets = images.length + videos.length;

    if (totalAssets === 0) {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
      return;
    }

    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets++;
      const currentProgress = Math.min(100, Math.floor((loadedAssets / totalAssets) * 100));
      setProgress(currentProgress);
      
      // If everything is loaded, wait a short moment for visual satisfaction before unmounting
      if (loadedAssets >= totalAssets) {
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    // Track Image loads
    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress); // count errors so we don't hang infinitely
      }
    });

    // Track Video loads
    videos.forEach((video) => {
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA
        updateProgress();
      } else {
        video.addEventListener('canplaythrough', updateProgress);
        video.addEventListener('error', updateProgress);
      }
    });
  }, []);

  return (
    <div className={`min-h-screen ${darkTheme ? "dark bg-[#111111] text-white" : "bg-[#F4EFEA] text-[#111111]"} font-sans ${isLoading ? "overflow-hidden h-screen" : ""}`}>
      <AnimatePresence>
        {isLoading && <Preloader progress={progress} />}
      </AnimatePresence>
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

      {/* Main Content Area */}
      <main className="w-full min-h-screen">
        <Hero />
        <WhatWeDo />
        <CoreValues />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
