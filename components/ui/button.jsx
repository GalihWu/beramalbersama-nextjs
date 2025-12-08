import React from 'react';
import clsx from 'clsx';

export default function Button({
  variant,
  className,
  size,
  children,
  onClick,
  disabled,
  id,
  type,
}) {
  const variants = {
    tosca: 'bg-tosca text-white',
    orange: 'bg-orange text-white',
    'orange-gradient': 'button-orange-gradient text-white',
    transparent: 'bg-transparent text-white',
    'color-tosca': 'text-tosca bg-transparent',
    danger: 'text-white bg-[#D0454C]',
  };

  const sizes = {
    large: 'h-[45px] w-fit',
    icon: 'h-10 w-10 p-0',
    full: 'h-[45px] w-full',
  };

  const variantClass = variants[variant] || '';
  const sizeClass = sizes[size] || 'h-10 w-fit';

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-[14px] rounded-[6px] text-base md:text-lg font-medium',
        variantClass,
        sizeClass,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      id={id}
      type={type}
    >
      {children}
    </button>
  );
}
