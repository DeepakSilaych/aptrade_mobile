import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export const ArrowDown = ({ size }: { size: number }) => {
  const svg = `<svg viewBox="0 0 24 24" fill="#5B5A5F" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#141416" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

  return <SvgXml xml={svg} width={size} height={size} />;
};
