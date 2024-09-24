import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export const Next = ({ size }: { size: number }) => {
  const svg = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="url(#paint0_linear_488_14461)"/>
                <path d="M14 20H25M25 20L21.15 24M25 20L21.15 16" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                <linearGradient id="paint0_linear_488_14461" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E29809"/>
                <stop offset="1" stop-color="#775105"/>
                </linearGradient>
                </defs>
                </svg>
              `

  return <SvgXml xml={svg} width={size} height={size} />;
};
