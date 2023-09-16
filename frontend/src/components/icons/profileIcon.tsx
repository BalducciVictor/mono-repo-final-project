import * as React from 'react';

export const ProfileIcon = ({ color, size }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.228882 16H13.7711C13.7711 12.9022 11.5345 10.3124 8.53417 9.64145C10.5131 8.99628 11.943 7.13785 11.943 4.94348C11.943 2.21379 9.73044 0 6.99984 0C4.26894 0 2.05515 2.21319 2.05515 4.94348C2.05515 7.13876 3.48569 8.99689 5.4643 9.64145C2.46513 10.3115 0.228882 12.9022 0.228882 16Z"
      fill={color}
    />
  </svg>
);
