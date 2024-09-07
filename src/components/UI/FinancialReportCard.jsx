import React, { forwardRef } from 'react';
import Table from './Table';
import Image from "next/image";

const defaultIcon = '/images/investorIcon.png';

const FinancialReportCard = forwardRef(function financialReportCard(
  { heading = '', subHeading = [], className = '' },
  ref
) {
  const handleClick = (href, type) => {
    if (type === 'PDF') {
      window.open(href);
    } else if (type === 'AUDIO') {
      try {
        const audio = new Audio(href);
        audio.play();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const columnData = [
    {
      title: heading,
      render: ({ title, icon = defaultIcon, href, type = 'PDF' }, index) => {
        return (
          <div
            className="border-b border-borderColorGrey last:border-b-0"
            key={index}
          >
            <div className="flex items-center justify-start">
              <p className="grow">{title}</p>
              <div
                onClick={() => handleClick(href, type)}
                className="cursor-pointer w-[32px] h-[32px] shrink-0"
              >
        <Image src={icon} width={118} height={118} className="w-full h-full" alt='icon' />

              </div>
            </div>
          </div>
        );
      }
    }
  ];

  return (
    <Table
      ref={ref}
      columnData={columnData}
      rowData={subHeading}
      parentClassName={className}
    />
  );
});

export default FinancialReportCard;
