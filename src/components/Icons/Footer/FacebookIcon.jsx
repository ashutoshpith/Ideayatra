import clsx from "clsx";
import React from "react";

const Facebook = ({ className = "", fill = "", id = 1, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="22"
      viewBox="0 0 10 22"
      fill="none"
    >
      <path
        d="M9.98511 0.166748H6.58884C4.57338 0.166748 2.33162 1.03101 2.33162 4.00968C2.34145 5.04756 2.33162 6.04154 2.33162 7.16021H0V10.9431H2.40377V21.8334H6.82081V10.8712H9.73622L10 7.14959H6.7447C6.7447 7.14959 6.75199 5.49405 6.7447 5.01327C6.7447 3.83617 7.94602 3.90357 8.01827 3.90357C8.58993 3.90357 9.70144 3.90527 9.98678 3.90357V0.166748H9.98511Z"
        fill="white"
      />
    </svg>
  );
};

export default Facebook;
