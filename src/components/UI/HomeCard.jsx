import React, { forwardRef } from 'react';
import clsx from 'clsx';
import ArrowRightIcon from '../Icons/ArrowRightIcon';
import Image from "next/image";

const HomeCard = forwardRef(function HomeCard(
  { icon, heading, description, onClick, className = '' },
  ref
) {
  return (
    <div
      className={clsx(
        'w-[400px] min-h-[440px] h-auto md:w-[280px] md:min-h-[320px] flex flex-col items-center justify-center font-roboto gap-8 bg-white p-4 rounded-2xl shadow-sm',
        className
      )}
      ref={ref}
    >
      <Image src={icon} width={118} height={118} className="w-[118px] h-[118px]" alt='icon' />
      <div>
        <p className="font-normal text-xl text-center">{heading}</p>
        <p className="font-light text-base text-grey-dark whitespace-pre-line text-center mt-2">
          {description}
        </p>
      </div>
      <div
        className="flex items-center justify-center gap-2 cursor-pointer"
        onClick={onClick}
      >
        <p className="font-bold text-base text-mainTheme">Know more</p>
        <ArrowRightIcon className="stroke-mainTheme" />
      </div>
    </div>
  );
});

export default HomeCard;
