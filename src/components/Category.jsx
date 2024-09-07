"use client";

import CardOne from "./Icons/Landingpage/Card1";
import CardTwo from "./Icons/Landingpage/Card2";
import CardThree from "./Icons/Landingpage/Card3";
import CardFour from "./Icons/Landingpage/Card4";
import CardFive from "./Icons/Landingpage/Card5";
import { useCallback, useState } from "react";

const groupCategory = [
  {
    id: 1,
    icon: CardOne,
    title: "Idea Incubation and Development",
    description: `We welcome students with their own ideas or help them brainstorm new concepts in our creative space. Our experienced mentors guide students through the ideation process, helping refine and validate their concepts.`,
  },
  {
    id: 2,
    icon: CardTwo,
    title: "Comprehensive Incubator Support",
    description: `IdeaYatra provides a full-fledged incubator environment, offering resources such as technology infrastructure, and access to industry experts. We create an ecosystem that simulates a real startup environment.`,
  },
  {
    id: 3,
    icon: CardThree,
    title: "Idea to Product Journey",
    description: `We assist students in converting their abstract ideas into tangible, functional products. Our structured approach ensures that every aspect of product development is covered, from conceptualization to prototyping.`,
  },
  {
    id: 4,
    icon: CardFour,
    title: "Global Showcase Platform",
    description: `IdeaYatra offers students a platform to present their ideas and products to a global audience. We organize pitch events, demo days, and online showcases to give visibility to student innovations.`,
  },
  {
    id: 5,
    icon: CardFive,
    title: "Market-Ready Product Development",
    description: `Our goal is to help students create products that are not just functional, but also market-ready. We focus on aspects like user experience, market fit, and scalability to ensure the product's viability in the real world.`,
  },
];

const Category = () => {
  const [color, setColor] = useState("");
  const [id, setId] = useState(0);
  const handleClick = useCallback((color, id) => {
    setColor(color);
    setId(id);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14">
      {groupCategory.map((category, i) => {
        const Icon = category.icon;
        return (
          <div
            className="relative p-4 sm:p-5 lg:p-6 cursor-pointer flex flex-col justify-center items-center text-center gap-2 lg:gap-4 bg-white rounded-md max-w-full transition-transform transform group hover:scale-105 hover:rounded-md hover:bg-[url('../../public/landingPage/cardOverlay.png')] hover:text-white bg-cover"
            key={i}
            onMouseEnter={() => handleClick("#FFA500", category.id)}
            onMouseLeave={() => handleClick("", 0)}
          >
            <div className="absolute inset-0 group-hover:bg-[url('../../public/landingPage/cardBackground.png')] bg-cover bg-center hover:text-white rounded-md"></div>
            <div className="relative flex flex-col items-center justify-center h-full p-4 text-center text-gray-900 group-hover:text-white transition-colors duration-300 gap-2">
              <span>{<Icon fill={color} id={id} />}</span>
              <p className="group-hover:text-white text-[#2F327D] text-sm sm:text-base">{category.title}</p>
              <p className="group-hover:text-white text-xs sm:text-sm">{category.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
