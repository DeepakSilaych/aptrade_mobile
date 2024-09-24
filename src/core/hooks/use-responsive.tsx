import { PixelRatio, Platform, useWindowDimensions } from 'react-native';

const baseDevice = {
  width: 375,
  height: 812,
};

const baseFontSize = 16;

const maxFontScaleFactor = 2;

/**
 * Defines breakpoints for responsive design.
 */
const breakpoints = {
  group1: [0, 399],
  group2: [400, 599],
  group3: [600, 767],
  group4: [768, 1007],
  group5: [1008, 1279],
  group6: [1280, 8192],
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  /**
   * Determines if the device is in landscape orientation.
   * @type {boolean}
   */
  const isLandscape = width > height;
  /**
   * Determines if the device is in portrait orientation.
   * @type {boolean}
   */
  const isPortrait = width < height;
  /**
   * The current breakpoint group based on the device width.
   * @type {string}
   */
  const breakpointGroup = getBreakpointGroup(width);
  /**
   * Determines if the platform is iOS.
   * @type {boolean}
   */
  const isIOS = Platform.OS === 'ios';
  /**
   * Determines if the platform is Android.
   * @type {boolean}
   */
  const isAndroid = Platform.OS === 'android';

  const rem = (size = 0) => {
    return _rem(size, height, width);
  };
  const rf = (size = 0) => {
    return _rf(size);
  };
  const wp = (widthPercent: number | string) => {
    return _wp(widthPercent, width);
  };
  const hp = (heightPercent: number | string) => {
    return _hp(heightPercent, height);
  };
  const vw = (widthPercent: number | string) => {
    return _vw(widthPercent, width);
  };
  const vh = (heightPercent: number | string) => {
    return _vh(heightPercent, height);
  };

  return {
    isLandscape,
    isPortrait,
    wp,
    hp,
    vw,
    vh,
    rem,
    rf,
    isIOS,
    isAndroid,
    breakpointGroup,
  };
};

export default useResponsive;

/**
 * Gets the current breakpoint group based on the device width.
 * @returns {string} The name of the current breakpoint group.
 */
const getBreakpointGroup = (width: number) => {
  for (const [group, range] of Object.entries(breakpoints)) {
    if (width >= range[0] && width <= range[1]) {
      return group;
    }
  }
};

/**
 * Converts provided font size to rem units.
 * @param  {number | string} size The font size in pixels.
 * @returns {number} The calculated rem value.
 */
const _rem = (size = 0, height: number, width: number) => {
  const base = width > height ? height : width;
  let multiplier = 1;
  if (Math.max(height, width) < baseDevice.height) {
    multiplier = 0.9;
  }
  const elementSize = typeof size === 'number' ? size : parseFloat(size);
  return Math.floor((base / baseDevice.width) * elementSize * multiplier);
};

/**
 * Converts provided font size to responsive font units (rf).
 * @param  {number | string} size The font size in pixels.
 * @returns {number} The calculated rf value.
 */
const _rf = (size = 0) => {
  const elementSize = typeof size === 'number' ? size : parseFloat(size);
  const scaledFontSize = Math.min(
    baseFontSize * maxFontScaleFactor,
    elementSize,
  );
  return scaledFontSize;
};

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {number | string} widthPercent The percentage of screen's width that UI element should cover.
 * @returns {number} The calculated dp depending on the current device's screen width.
 */
const _wp = (widthPercent: number | string, width: number) => {
  const elementWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elementWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {number | string} heightPercent The percentage of screen's height that UI element should cover.
 * @returns {number} The calculated dp depending on the current device's screen height.
 */
const _hp = (heightPercent: number | string, height: number) => {
  const elementHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elementHeight) / 100);
};

/**
 * Converts provided width percentage to viewport-relative units (vw).
 * @param  {number | string} widthPercent The percentage of viewport's width that UI element should cover.
 * @returns {number} The calculated vw value.
 */
const _vw = (widthPercent: number | string, width: number) => {
  const elementWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return Math.floor((width / 100) * elementWidth);
};

/**
 * Converts provided height percentage to viewport-relative units (vh).
 * @param  {number | string} heightPercent The percentage of viewport's height that UI element should cover.
 * @returns {number} The calculated vh value.
 */
const _vh = (heightPercent: number | string, height: number) => {
  const elementHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return Math.floor((height / 100) * elementHeight);
};
