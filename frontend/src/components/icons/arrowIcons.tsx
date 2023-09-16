import React from 'react';

export const RightArrow = ({ color, size }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.94 8L1.94 0L0.0600023 1.88L6.16667 8L0.0600023 14.12L1.94 16L9.94 8Z"
      fill={color}
    />
  </svg>
);
