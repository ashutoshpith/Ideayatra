import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import NavLink from '../UI/NavLink';
import { useRouter } from 'next/router';
import { gsap, Power4 } from 'gsap';
import ArrowIcon from '../Icons/ArrowIcon';
const RouteLinks = {

}
const ContactUsRoutes = {
    title: 'Contact Us',
    href: '/contact-us'
  };

const commonClass =
  'bg-mainTheme rounded-lg h-[3px] my-1 transition-all ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)] duration-[400ms]';

const HamburgerMenu = ({ isHome }) => {
  const [isActive, setIsActive] = useState(false);
  const [collapseIndex, setCollapseIndex] = useState(-1);
  const { pathname } = useRouter();
  const linkRefs = useRef([]);
  const isAnimatedPlayed = useRef(false);

  const handleClick = useCallback(() => {
    setIsActive((old) => !old);
  }, []);

  useEffect(() => {
    setIsActive(false);
    setTimeout(() => setCollapseIndex(-1), 200);
  }, [pathname]);

  useEffect(() => {
    if (isActive && !isAnimatedPlayed.current) {
      const tl = gsap.timeline({ delay: 0.1 });
      linkRefs.current.map((target) => {
        tl.fromTo(
          target,
          {
            x: -100,
            opacity: 0,
            duration: 0.2,
            ease: Power4.easeIn
          },
          {
            x: 0,
            opacity: 1
          },
          '<+0.05'
        );
      });
      isAnimatedPlayed.current = true;
    }
  }, [isActive]);

  const handleCollapseIndex = (index) => {
    let newIndex = index;
    if (index === collapseIndex) newIndex = -1;
    setCollapseIndex(newIndex);
  };

  return (
    <>
      <div
        className={clsx(
          'hidden w-[30px] cursor-pointer lg:flex lg:flex-col lg:relative lg:z-[100]'
        )}
        onClick={handleClick}
      >
        <div
          className={clsx(
            commonClass,
            'w-1/2',
            isActive
              ? 'origin-left w-full transform translate-y-[1px] rotate-45'
              : ''
          )}
        ></div>
        <div
          className={clsx(commonClass, isActive ? 'origin-left w-0' : 'w-full')}
        ></div>
        <div
          className={clsx(
            commonClass,
            'w-3/4',
            isActive ? 'w-full origin-left transform -rotate-45 ' : ''
          )}
        ></div>
      </div>
      <div
        className={clsx(
          'hidden lg:block fixed bg-white left-0 z-[50] transition-all duration-[400ms] ease-[cubic-bezier(0.68, -0.6, 0.32, 1.6)] overflow-auto scrollbar-hide',
          { 'h-0': !isActive },
          { 'h-[calc(100vh_-_80px)]': isActive && !isHome },
          { 'h-auto': isActive && isHome },
          isHome
            ? 'w-[90vw] top-[60px] shadow-sm rounded-[0px_0px_24px_24px] max-h-[calc(100vh_-_120px)]'
            : 'w-screen top-[80px] max-h-[calc(100vh_-_80px)]'
        )}
      >
        <div
          className={clsx(
            'w-full flex flex-col items-start justify-start px-6 pb-10 gap-y-4',
            isHome ? 'mt-12' : 'mt-8'
          )}
        >
          {[...RouteLinks, ContactUsRoutes].map(
            ({ title, sublink, ...rest }, index) => (
              <div
                className="w-full h-auto border-b-[1px] border-b-borderColorLight pb-2 last:border-b-0"
                ref={(e) => {
                  linkRefs.current[index] = e;
                }}
                key={rest.href}
              >
                <div className="w-full flex flex-row items-center justify-between">
                  <NavLink {...rest}>{title}</NavLink>
                  {sublink?.length ? (
                    <ArrowIcon
                      onClick={() => handleCollapseIndex(index)}
                      className={clsx(
                        'transition-all duration-200 ease-in-out',
                        index === collapseIndex ? 'transform rotate-180' : ''
                      )}
                    />
                  ) : null}
                </div>
                {sublink?.length ? (
                  <div
                    className={clsx(
                      'w-full overflow-hidden',
                      collapseIndex === index ? 'h-full' : 'h-0'
                    )}
                  >
                    <div className="w-full h-full flex flex-col items-start justify-start p-2 gap-2">
                      {sublink.map(({ title, sublink, ...rest }) => (
                        <div
                          className={clsx('pl-1 py-2 w-full')}
                          key={rest.href}
                        >
                          <NavLink {...rest} className="text-sm">
                            {title}
                          </NavLink>
                          {sublink?.length ? (
                            <div className="pt-2 w-full flex flex-col pl-2 items-start justify-start gap-[6px]">
                              {sublink?.map(({ title, ...rest }) => (
                                <NavLink
                                  {...rest}
                                  key={rest.href}
                                  className="!font-light text-sm"
                                >
                                  &#62; {title}
                                </NavLink>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
