import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavLink from "../UI/NavLink";
import HamburgerMenu from "./HamburgerMenu";
import RouteLinks from "../RouteLinks";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import logo from "../../../public/ideayatra.png";

const Navbar = ({ isHome }) => {
  const router = useRouter();
  const [hoverIndex, setHoverIndex] = useState(-1);


  useEffect(() => {
    setHoverIndex(-1);
  }, [router.pathname]);

  return (
    <div
      className={clsx(
        "h-[100px] flex flex-row items-center justify-between absolute px-8 bg-white z-[100] lg:h-[80px] shadow-sm transition-all duration-[400ms] ease-in-out left-[50%] transform -translate-x-[50%]",
        isHome ? "w-[90vw] translate-y-10 rounded-3xl" : "w-screen"
      )}
    >
      <div
        className="h-[30px] aspect-[36/9] relative lg:h-[40px] cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={logo} 
          sizes=""
          priority fill alt="logo"
           />
      </div>
      <div className="hidden grow lg:flex flex-row items-center justify-end self-stretch gap-2 ">
        {RouteLinks.map(({ title, ...rest }, index) => (
          <div
            className={clsx(
              "self-stretch flex items-center justify-center relative hover:before:opacity-100 [&>.submenu]:hover:h-auto",
              'before:content-[""] before:w-[calc(100%_+_30px)] before:h-[10px] before:absolute before:-left-[15px] before:top-[71px] before:rounded-[8px_8px_0px_0px] before:bg-mainTheme2/80 before:opacity-0'
            )}
            key={rest.href}
            onMouseOver={() => setHoverIndex(index)}
            onMouseOut={() => setHoverIndex(-1)}
          >
            <NavLink
              {...rest}
              className="px-3 py-2 relative transition-all"
              activeClassName="after:absolute after:w-full after:h-full after:top-0 after:left-0 after:text-[#2F327D] after:bg-[#2F327D]/5 after:opacity-1 after:rounded-lg"
            >
              {title}
            </NavLink>
          </div>
        ))}
      </div>
      <HamburgerMenu isHome={isHome} />
    </div>
  );
};

export default Navbar;
