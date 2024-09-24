import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

const LoadingCard = ({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) => {
  return (
    <View
      style={{
        borderRadius: 13,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: "rgba(73, 73, 83, 0.5)",
        overflow: "hidden",
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#2C2C36", "#24242C", "#191820", "#110F14"]}
        style={{
          width,
          height,
          borderRadius: 13,
          alignItems: "center", // Added to center children horizontally
          justifyContent: "center",
        }}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export const SilverClub = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={silverClubsSvg} width={width / 3} height={width / 2.8} />
    </LoadingCard>
  );
};

export const GoldClub = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={goldClubsSvg} width={width / 3} height={width / 2.8} />
    </LoadingCard>
  );
};

export const SilverHeart = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={silverHeartsSvg} width={width / 2.8} height={width / 2.9} />
    </LoadingCard>
  );
};

export const GoldHeart = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={goldHeartsSvg} width={width / 2.8} height={width / 2.9} />
    </LoadingCard>
  );
};

export const SilverDiamond = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={silverDiamondsSvg} width={width / 3} height={width / 2.5} />
    </LoadingCard>
  );
};

export const GoldDiamond = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={goldDiamondsSvg} width={width / 3} height={width / 2.5} />
    </LoadingCard>
  );
};


export const SilverSpade = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={silverSpadesSvg} width={width / 2.9} height={width / 2.6} />
    </LoadingCard>
  );
};

export const GoldSpade = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <LoadingCard width={width} height={height}>
      <SvgXml xml={goldSpadesSvg} width={width / 2.9} height={width / 2.6} />
    </LoadingCard>
  );
};

const silverHeartsSvg = `<svg width="473" height="459" viewBox="0 0 473 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M472.935 131.346C477.341 276.871 257.505 379.089 236.856 459C214.298 371.711 4.76522 283.204 0.0856246 131.346C-4.40511 -14.4834 168.95 -46.1259 236.856 75.8521C306.442 -49.1291 468.591 -12.0461 472.935 131.346Z" fill="url(#paint0_linear_37_5)"/>
<defs>
<linearGradient id="paint0_linear_37_5" x1="236.5" y1="0" x2="236.5" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#B5B5BF"/>
<stop offset="1" stop-color="#858593"/>
</linearGradient>
</defs>
</svg>
`;

const silverDiamondsSvg = `<svg width="409" height="459" viewBox="0 0 409 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M409 229.5C328.717 272.627 249.284 359.055 204.5 459C159.716 359.055 80.2944 272.627 0 229.5C80.2828 186.373 159.716 99.9455 204.5 0C249.284 99.9455 328.706 186.373 409 229.5Z" fill="url(#paint0_linear_37_7)"/>
<defs>
<linearGradient id="paint0_linear_37_7" x1="204.5" y1="0" x2="204.5" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#B5B5BF"/>
<stop offset="1" stop-color="#858593"/>
</linearGradient>
</defs>
</svg>
`;

const silverSpadesSvg = `<svg width="400" height="459" viewBox="0 0 400 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M400 282.29C400 346.233 346.776 375.525 309.972 375.545C268.93 375.545 237.922 356.29 219.461 340.567C221.896 392.586 233.783 429.749 287.125 459H112.875C166.217 429.749 178.104 392.586 180.539 340.567C162.078 356.28 131.06 375.566 90.0278 375.545C53.2735 375.545 0 346.233 0 282.29C0 165.418 79.4816 197.222 199.995 0C320.518 197.222 400 165.429 400 282.29Z" fill="url(#paint0_linear_37_9)"/>
<defs>
<linearGradient id="paint0_linear_37_9" x1="200" y1="0" x2="200" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#B5B5BF"/>
<stop offset="1" stop-color="#858593"/>
</linearGradient>
</defs>
</svg>
`;

const silverClubsSvg = `<svg width="422" height="459" viewBox="0 0 422 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.8" d="M422 269.459C422.005 294.443 413.821 318.636 398.877 337.815C383.932 356.995 363.176 369.943 340.23 374.4C317.284 378.857 293.606 374.54 273.328 362.202C253.05 349.864 237.46 330.29 229.278 306.894C229.202 377.057 233.404 423.74 295.548 459H126.352C188.497 423.75 192.699 377.077 192.622 306.894C185.785 326.401 173.761 343.333 158.037 355.596C142.313 367.859 123.578 374.916 104.151 375.893C84.7229 376.87 65.454 371.724 48.7269 361.093C31.9998 350.461 18.5482 334.81 10.0355 316.075C1.52293 297.34 -1.67729 276.342 0.830673 255.679C3.33863 235.016 11.4448 215.593 24.1466 199.814C36.8484 184.034 53.5888 172.589 72.2974 166.894C91.0061 161.2 110.862 161.505 129.411 167.773C118.971 151.793 112.822 133.052 111.633 113.589C110.445 94.1251 114.262 74.6853 122.67 57.3849C131.078 40.0844 143.754 25.5862 159.318 15.4682C174.883 5.35016 192.74 0 210.945 0C229.151 0 247.008 5.35016 262.573 15.4682C278.137 25.5862 290.813 40.0844 299.221 57.3849C307.629 74.6853 311.446 94.1251 310.258 113.589C309.069 133.052 302.92 151.793 292.48 167.773C307.393 162.734 323.203 161.529 338.631 164.255C354.059 166.981 368.671 173.562 381.284 183.464C393.896 193.366 404.155 206.311 411.228 221.252C418.302 236.192 421.992 252.707 422 269.459Z" fill="url(#paint0_linear_37_3)"/>
<defs>
<linearGradient id="paint0_linear_37_3" x1="211" y1="0" x2="211" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#B5B5BF"/>
<stop offset="1" stop-color="#858593"/>
</linearGradient>
</defs>
</svg>
`;

const goldHeartsSvg = `<svg width="473" height="459" viewBox="0 0 473 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M472.935 131.346C477.341 276.871 257.505 379.089 236.856 459C214.298 371.711 4.76522 283.204 0.0856246 131.346C-4.40511 -14.4834 168.95 -46.1259 236.856 75.8521C306.442 -49.1291 468.591 -12.0461 472.935 131.346Z" fill="url(#paint0_linear_37_12)"/>
<defs>
<linearGradient id="paint0_linear_37_12" x1="236.5" y1="0" x2="236.5" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#E9AE5F"/>
<stop offset="1" stop-color="#E4A03F"/>
</linearGradient>
</defs>
</svg>
`

const goldDiamondsSvg = `<svg width="409" height="459" viewBox="0 0 409 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M409 229.5C328.717 272.627 249.284 359.055 204.5 459C159.716 359.055 80.2944 272.627 0 229.5C80.2828 186.373 159.716 99.9455 204.5 0C249.284 99.9455 328.706 186.373 409 229.5Z" fill="url(#paint0_linear_37_11)"/>
<defs>
<linearGradient id="paint0_linear_37_11" x1="204.5" y1="0" x2="204.5" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#E9AE5F"/>
<stop offset="1" stop-color="#E4A03F"/>
</linearGradient>
</defs>
</svg>
`

const goldSpadesSvg = `<svg width="400" height="459" viewBox="0 0 400 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M400 282.29C400 346.233 346.776 375.525 309.972 375.545C268.93 375.545 237.922 356.29 219.461 340.567C221.896 392.586 233.783 429.749 287.125 459H112.875C166.217 429.749 178.104 392.586 180.539 340.567C162.078 356.28 131.06 375.566 90.0278 375.545C53.2735 375.545 0 346.233 0 282.29C0 165.418 79.4816 197.222 199.995 0C320.518 197.222 400 165.429 400 282.29Z" fill="url(#paint0_linear_37_10)"/>
<defs>
<linearGradient id="paint0_linear_37_10" x1="200" y1="0" x2="200" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#E9AE5F"/>
<stop offset="1" stop-color="#E4A03F"/>
</linearGradient>
</defs>
</svg>
`

const goldClubsSvg = `<svg width="422" height="459" viewBox="0 0 422 459" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M422 269.459C422.005 294.443 413.821 318.636 398.877 337.815C383.932 356.995 363.176 369.943 340.23 374.4C317.284 378.857 293.606 374.54 273.328 362.202C253.05 349.864 237.46 330.29 229.278 306.894C229.202 377.057 233.404 423.74 295.548 459H126.352C188.497 423.75 192.699 377.077 192.622 306.894C185.785 326.401 173.761 343.333 158.037 355.596C142.313 367.859 123.578 374.916 104.151 375.893C84.7229 376.87 65.454 371.724 48.7269 361.093C31.9998 350.461 18.5482 334.81 10.0355 316.075C1.52293 297.34 -1.67729 276.342 0.830673 255.679C3.33863 235.016 11.4448 215.593 24.1466 199.814C36.8484 184.034 53.5888 172.589 72.2974 166.894C91.0061 161.2 110.862 161.505 129.411 167.773C118.971 151.793 112.822 133.052 111.633 113.589C110.445 94.1251 114.262 74.6853 122.67 57.3849C131.078 40.0844 143.754 25.5862 159.318 15.4682C174.883 5.35016 192.74 0 210.945 0C229.151 0 247.008 5.35016 262.573 15.4682C278.137 25.5862 290.813 40.0844 299.221 57.3849C307.629 74.6853 311.446 94.1251 310.258 113.589C309.069 133.052 302.92 151.793 292.48 167.773C307.393 162.734 323.203 161.529 338.631 164.255C354.059 166.981 368.671 173.562 381.284 183.464C393.896 193.366 404.155 206.311 411.228 221.252C418.302 236.192 421.992 252.707 422 269.459Z" fill="url(#paint0_linear_37_13)"/>
<defs>
<linearGradient id="paint0_linear_37_13" x1="211" y1="0" x2="211" y2="459" gradientUnits="userSpaceOnUse">
<stop stop-color="#E9AE5F"/>
<stop offset="1" stop-color="#E4A03F"/>
</linearGradient>
</defs>
</svg>
`