import * as React from 'react';
import clsx from 'clsx';

const ScrollIcon = ({ className, ...props }) => (
  <div
    className={clsx(
      'w-5 h-[30px] bg-transparent border-solid border-[1px] border-white rounded-2xl relative',
      className
    )}
    {...props}
  >
    <div className="bg-white w-[2px] h-[6px] absolute left-[50%] -translate-x-[50%] rounded animate-scroll" />
  </div>
);
export default ScrollIcon;
