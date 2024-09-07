import React from 'react';
import Image from "next/image";

const CareerCard = ({ text }) => {
  return (
    <div className="flex justify-between rounded-3xl bg-white max-w-[848px] lg:max-w-[1090px] px-[30px] py-[37px] cursor-pointer">
      <p className="text-base text-black-pop font-normal">{text}</p>
      <div className="flex justify-center w-[16px] h-[25px] items-center">
        <Image src="/images/career/Vector.png" width={118} height={118} className="w-[118px] h-[118px]" alt='icon' />
      </div>
    </div>
  );
};
export default CareerCard;
