"use client";

import React from 'react';
import robot from "../../../public/about-group.png";
import Image from "next/image";
import {useRouter} from 'next/navigation'

const About = () => {
  const router = useRouter()
  return (
    <>
      <meta name="description" content="IdeaYatra ermpower the next generation of thinkers, creators, and innovators." />
      <meta name="keywords" content="edtech, education, startup, upskill" />
      <meta property="og:title" content="IdeaYatra About - Empowering Student Innovators" />
      <meta property="og:description" content="IdeaYatra ermpower the next generation of thinkers, creators, and innovators." />
      <meta property="og:image" content="/public/ideayatra.png" />
      <meta property="og:url" content="https://ideayatra.com" />
      <meta name="twitter:card" content="summary_large_image" />

     <div className="container my-48 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 
      flex flex-col-reverse md:flex-row items-center justify-between">
      {/* Left Side - Text Content */}
      <div className="text-center md:text-left max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mainTheme3 tracking-tight leading-tight sm:leading-snug">
          Transforming Ideas into <span className="text-mainTheme2">MVP Innovations</span>
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
        At Idea Yatra, We believe that every great innovation begins with a simple idea.
        Our mission is to empower the next generation of thinkers, creators, and innovators by providing them with the tools and guidance they need to transform their ideas into reality.
        </p>
        <div className='py-10'>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mainTheme2 tracking-tight leading-tight sm:leading-snug">What We Do</h1>
        <p className='mt-4 text-gray-600 text-base sm:text-lg'>
          Idea Yatra is a unique platform designed to bridge the gap between imagination and implementation.
          We focus on guiding engineering students through the entire journey of innovation from the initial spark of an idea to the development of a market-ready product. 
          By fostering creativity and providing hands-on experience, we prepare our participants to meet the challenges of the real world and make a lasting impact in their fields.
        </p>
        </div>
        <div className="mt-6 sm:mt-8">
          <button 
          onClick={
            () => router.push("/contact-us")
          }
          className=" bg-mainTheme2 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow hover:bg-orange-400 transition-all">
            Contact us
          </button>
        </div>
      </div>

      {/* Right Side - Images */}
      <div className="relative flex items-center justify-center mb-8 md:mb-0">
        <div className="relative w-[250px] sm:w-[300px] md:w-[200px] lg:w-[650px] xl:w-[600px] h-auto">
          {/* Placeholder for the first image */}
          <Image
            src={robot}
            width={600}
            height={"auto"}
            alt="Robot"
            className="w-full h-auto"
          />
          {/* Optional Instructor Badge */}
          <div className="absolute -top-4 -right-4 flex items-center justify-center bg-white p-2 rounded-full shadow-lg">
            <div className="text-center">
              <span className="text-xs font-medium text-gray-700">50+ BEST INSTRUCTORS</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>

  );
};

export default About;
