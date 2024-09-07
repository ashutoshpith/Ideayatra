"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { forwardRef } from 'react';

const NavLink = forwardRef(function NavLink(
  {
    href,
    exact = false,
    children,
    className = '',
    inactiveClassName = '',
    activeClassName = '',
    openInNewTab = false,
    disabled = false,
    ...props
  },
  ref
) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname?.startsWith(href);

  if (isActive) {
    props.className += ' active';
  }

  return (
    <Link
      href={!disabled ? href : ''}
      legacyBehavior
      className={clsx(!disabled ? 'cursor-pointer' : 'cursor-default')}
    >
      <a
        {...props}
        className={clsx(
          'text-base font-normal no-underline tracking-wider capitalize block relative',
          !disabled ? 'cursor-pointer' : 'cursor-default',
          className,
          isActive
            ? `text-mainTheme2 ${activeClassName}`
            : `text-black ${inactiveClassName}`
        )}
        target={openInNewTab ? '_blank' : '_self'}
        ref={ref}
      >
        {children}
      </a>
    </Link>
  );
});

export default NavLink;
