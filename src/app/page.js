"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Power4 } from "gsap";
import { getLandingPage } from "@studio/lib/queries";
import Category from "../components/Category";
import HeroSection from '@/components/Home/Hero'
import EnrollSection from "@/components/Home/Enroll";

const Home = () => {
  const [landingPageData, setLandingPageData] = useState([]);
  const isAnimatedPlayed = useRef(false);
  const linkRefs = useRef([]);

  useEffect(() => {
    if (!isAnimatedPlayed.current) {
      const tl = gsap.timeline({ delay: 0.1 });
      linkRefs.current.map((target) => {
        tl.fromTo(
          target,
          {
            y: 100,
            opacity: 0,
            duration: 0.2,
            ease: Power4.easeIn,
          },
          {
            y: 0,
            opacity: 1,
          },
          "<+0.05"
        );
      });
      isAnimatedPlayed.current = true;
    }

    (async () => {
      const landingPage = await getLandingPage();
      setLandingPageData(landingPage);
    })();
  }, []);
 
  return (
    <>
        <meta name="description" content="IdeaYatra ermpower the next generation of thinkers, creators, and innovators." />
        <meta name="keywords" content="edtech, education, startup, upskill" />
        <meta property="og:title" content="IdeaYatra - Empowering Student Innovators" />
        <meta property="og:description" content="IdeaYatra ermpower the next generation of thinkers, creators, and innovators." />
        <meta property="og:image" content="/public/ideayatra.png" />
        <meta property="og:url" content="https://ideayatra.com" />
        <meta name="twitter:card" content="summary_large_image" />

    <div
      className="flex flex-col px-[5vw] xl:px-[10vw] lg:px-[5vw] py-28 w-full z-0 
      bg-[url('../../public/landingPage/backgroundBanner.png')] bg-no-repeat"
      ref={(e) => {
        linkRefs.current[0] = e;
      }}
    >
      <HeroSection />
      <EnrollSection />
      <div className="flex flex-col gap-4 lg:gap-8 mt-16 justify-center items-center">
        <p className="text-2xl md:text-[36px] text-[#2F327D] lg:text-[44px] font-semibold">
          Our<span className="text-[#F48C06]"> Popular Category</span>
        </p>
      </div>
        <Category />
    </div>
  
  
  
    </>
  );
};
export default Home;
