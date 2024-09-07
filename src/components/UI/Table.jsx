import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Table = forwardRef(function Table(
  {
    title = '',
    columnData,
    rowData = [],
    className = '',
    description = '',
    parentClassName = '',
    ...rest
  },
  ref
) {
  return (
    <div className={parentClassName} {...rest} ref={ref}>
      {title ? (
        <p className="text-2xl lg:text-xl md:text-lg mb-6 capitalize">
          {title}
        </p>
      ) : null}
      <div className="overflow-x-auto shadow-sm rounded-2xl">
        <div className={clsx('w-full flex flex-col', className)} {...rest}>
          <div
            className={clsx(
              'flex flex-row items-start gap-x-2 justify-start bg-mainTheme py-7 px-9 lg:py-6 lg:px-7 md:py-6 md:px-5 rounded-2xl sticky top-0',
              "before:content-[''] before:w-full before:absolute before:h-[20px] before:bottom-0 before:left-0 before:-z-[1]"
            )}
          >
            {columnData.map((column, index) => (
              <p
                className="text-white text-lg font-semibold lg:text-base capitalize break-words"
                style={
                  column?.width
                    ? {
                        width: `${column.width}`,
                        textAlign: column?.align || 'left'
                      }
                    : {
                        textAlign: column?.align || 'left',
                        width: `${Math.floor(100 / columnData.length)}%`
                      }
                }
                key={index}
              >
                {column.title}
              </p>
            ))}
          </div>
          <div className="w-full bg-white rounded-[0px_0px_16px_16px] grow overflow-y-auto">
            {rowData.map((row, index) =>
              Object.keys(row).length ? (
                <div
                  className="flex gap-x-2 w-full py-6 px-9 lg:py-5 lg:px-7 md:py-5 md:px-5 items-center justify-start border-b border-borderColorGrey last:border-b-0"
                  key={index}
                >
                  {columnData.map((column, index) => (
                    <div
                      className="text-base lg:text-sm font-normal break-words"
                      style={
                        column?.width
                          ? {
                              width: `${column.width}`,
                              textAlign: column?.align || 'left'
                            }
                          : {
                              textAlign: column?.align || 'left',
                              width: `${Math.floor(100 / columnData.length)}%`
                            }
                      }
                      key={index}
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.accessorKey]}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="w-full h-10 lg:h-8 md:h-6 border-b border-borderColorGrey last:border-b-0"
                  key={index}
                />
              )
            )}
          </div>
        </div>
      </div>
      {description ? <p>{description}</p> : null}
    </div>
  );
});

export default Table;
