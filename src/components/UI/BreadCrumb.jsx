import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';
import NavLink from './NavLink';
import HomeIcon from '../Icons/HomeIcon';
import clsx from 'clsx';

const BreadCrumb = forwardRef(function BreadCrumb(
  { className = '', ...rest },
  ref
) {
  const { pathname } = useRouter();

  let hrefData = [];
  const paths = pathname.split('/').map((path, index) => {
    let href = '/';
    if (index !== 0) {
      hrefData.push(path);
      href += hrefData.join('/');
    }
    return {
      href,
      title: path ? (
        path.split('-').join(' ')
      ) : (
        <HomeIcon className="lg:w-4 lg:h-4 md:h-3 md:w-3" />
      )
    };
  });

  return (
    <div
      className={clsx(
        'text-sm breadcrumbs mb-8 overflow-y-hidden overflow-x-auto scrollbar-hide',
        className
      )}
      {...rest}
      ref={ref}
    >
      <ul>
        {paths.map(({ href, title }) => (
          <li key={href}>
            <NavLink
              exact={true}
              href={href}
              className="capitalize text-base !font-light text-grey-dark md:text-sm"
              inactiveClassName="opacity-60"
              activeClassName="!font-normal !text-grey-dark"
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default BreadCrumb;
