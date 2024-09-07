"use client"

import React from 'react';
import Navbar from './Navbar';
import clsx from 'clsx';
import Footer from './Footer';

const LayoutWithNavbar = ({ children }) => {
  const pathname = '/'
  const isHome = pathname === '/';
  return (
    <div>
      <Navbar isHome={isHome} />
      <div className="flex flex-col flex-nowrap min-h-screen">
        <div
          className={clsx(
            'grow font-roboto',
             !isHome && 'pt-[100px] lg:pt-[80px]'
          )}
        >
          {children}
        </div>
        <Footer isHome={isHome} />
      </div>
    </div>
  );
};


export default LayoutWithNavbar;
