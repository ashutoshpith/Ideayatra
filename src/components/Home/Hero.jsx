"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import robot from '../../../public/banner_3.png';
import {useRouter} from 'next/navigation'

const EmpowerSection = () => {
  const robotRef = useRef(null);
  const textRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    // Animation for robot image
    gsap.fromTo(
      robotRef.current,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
      }
    );

    // Animation for text section
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="w-full h-auto py-10 flex flex-col lg:flex-row gap-10 lg:gap-20 px-10
     lg:px-10 justify-between items-center relative">
      
      {/* Text Section */}
      <div
        ref={textRef}
        className="w-full lg:w-[40%] text-center lg:text-left flex flex-col justify-center"
      >
        <p className="text-mainTheme2 text-xl lg:text-2xl font-semibold uppercase">
          Start to Success
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold text-mainTheme3 leading-tight mt-4">
          The Journey of Ideas <br /> 
          <span className="text-mainTheme2">Begins Here</span> 
        </h2>
        <p className="text-gray-700 mt-6">
          Unleashing the potential of engineering students by transforming their
          ideas into market-ready products. The unique incubator program provides
          a nurturing environment where innovation meets execution, bridging the
          gap between academic learning and real-world entrepreneurship.
        </p>
        <button 
        className="mt-8 bg-mainTheme2 shadow-lg text-white py-3 px-6 rounded-md text-lg font-semibold
         hover:bg-orange-400 transition-transform transform hover:scale-105"
         onClick={
           () => router.push("/contact-us")
         }
         >
          Join Now
        </button>
      </div>

      {/* Robot Section */}
      <div
        ref={robotRef}
        className="w-full lg:w-[60%] flex justify-center items-center relative hidden lg:block"
      >
        <div className="relative w-[250px] h-[250px] lg:w-[900px] lg:h-[600px] rounded-full my-4
        flex items-center justify-center text-white text-2xl lg:text-4xl font-bold">
          {/* 🤖 Idea Yatra */}
          <Image
            src={robot}
            width={750} // Adjust size as needed
            height={750} // Adjust size as needed
            alt="Foreground Robot"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EmpowerSection;
