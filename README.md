<p align="center"><img src="assets/icon.png" alt="AptoTrade icon" width="120"></p>

# aptrade_mobile

Mobile and web front end for [AptoTrade](https://github.com/DeepakSilaych/AptoTrade), a derivatives exchange on the Aptos blockchain. One Expo codebase runs on Android, iOS and the browser.

![Expo 51](https://img.shields.io/badge/expo-51-000020) ![React Native 0.74](https://img.shields.io/badge/react--native-0.74.1-61dafb) ![TypeScript](https://img.shields.io/badge/typescript-5.3-3178c6)

## Why

Most DEX front ends are web only and feel nothing like the exchange apps people already use. AptoTrade wants a CEX-style experience (spot, futures, wallet) on a decentralized backend. This repo is the client half of that: a tabbed trading UI built with Expo Router and Tailwind classes (NativeWind), so one TypeScript codebase ships to phone and browser. The Move contracts live in the sibling repo linked above.

Current state: the screens are a working UI prototype. All prices, order book rows and balances are hardcoded in the screen files. Nothing talks to Aptos yet (see [Limitations](#roadmap--limitations)).

## Demo

<!-- TODO: screenshot of the Trades tab (spot form + order book) -->
<!-- TODO: screenshot of the Futures tab (long/short form) -->
<!-- TODO: screenshot of the Wallet tab (balances + favorites) -->

Bundled app assets (wired in `app.json`):

| File | Used as |
|---|---|
| `assets/icon.png` | App icon |
| `assets/adaptive-icon.png` | Android adaptive icon foreground |
| `assets/splash.png` | Splash screen (`resizeMode: contain`, white background) |
| `assets/favicon.png` | Web favicon |

## Quickstart

Needs Node.js with npm (the project was scaffolded with npm 10.8.2, see `cesconfig.json`). For a phone, install Expo Go, or have an Android emulator / iOS simulator running.

```bash
git clone https://github.com/DeepakSilaych/aptrade_mobile.git
cd aptrade_mobile
npm install
```

Run on one target (each is a script in `package.json`):

```bash
npm run web       # expo start --web
npm run android   # expo start --android
npm run ios       # expo start --ios
```

Or start the dev server once and pick a target from the Expo menu:

```bash
npm start         # expo start
```

Verify: the app opens on a dark tab bar with five tabs (Home, Markets, Trades, Futures, Wallet). Tap Trades, change the amount, and the USDT total updates.

## How it works

```
package.json "main": expo-router/entry
        |
        v
app/_layout.tsx                 root <Stack>: "(tabs)" + "modal"
        |
        v
app/(tabs)/_layout.tsx          <Tabs>, Ionicons, dark theme (#1E293B, gold active)
   |        |         |           |           |
 index    market    trade      futures     wallet
 Home     Markets   Trades     Futures     Wallet
 (stub)   (stub)    buy/sell   long/short  balances +
                    form +     form +      favorites +
                    order book chart stub  refresh
                       |          |            |
                       v          v            v
              hardcoded arrays inside each screen file
              (no network calls, no chain calls)

Styling: global.css -> metro.config.js (withNativeWind) -> babel nativewind preset
         -> Tailwind classes on React Native components via className
```

1. Expo Router maps files under `app/` to routes. `app/_layout.tsx` is a native stack with the tab group and a `modal` route.
2. `app/(tabs)/_layout.tsx` declares the five tabs and their icons.
3. `app/(tabs)/trade.tsx` is the spot screen: a Buy/Sell toggle animated with Reanimated, price and amount inputs, a computed USDT total, a static bid/ask list, and a `react-native-modalize` bottom sheet to switch between BTC, ETH, SOL and BNB. Pressing Buy/Sell only writes to `console.log`.
4. `app/(tabs)/futures.tsx` mirrors that with a Long/Short toggle and a Show Chart button that reveals a grey placeholder box. Its order book is commented out.
5. `app/(tabs)/wallet.tsx` lists six tokens with logos from cryptologos.cc, an All/Favorites filter, and a refresh button that fills balances with random numbers.
6. `app/+html.tsx` is the web-only HTML shell (viewport scaling disabled, body scroll reset, dark-mode background).
7. `components/` holds small shared pieces (`Button`, `Container`, `HeaderButton`, `TabBarIcon`, `ScreenContent`) from the create-expo-stack template.

### Chain and wallet

There is no on-chain code in this repo yet. `@web3auth/react-native-sdk` is listed in `package.json` but is not imported anywhere, and no Aptos SDK is a dependency. Contract interfaces, order matching and settlement are defined in [DeepakSilaych/AptoTrade](https://github.com/DeepakSilaych/AptoTrade) (Move). This client will need an Aptos client and a wallet/auth layer wired into the Trade, Futures and Wallet screens to go live.

## Features

| Screen | What works today | Source |
|---|---|---|
| Trades | Buy/Sell toggle, price and amount inputs, live USDT total, token picker sheet, static order book | `app/(tabs)/trade.tsx` |
| Futures | Long/Short toggle, same inputs and total, chart placeholder toggle | `app/(tabs)/futures.tsx` |
| Wallet | Token list with logos, favorite star per token, All/Favorites filter, mock refresh | `app/(tabs)/wallet.tsx` |
| Home, Markets | Template placeholder text only | `app/(tabs)/index.tsx`, `market.tsx` |
| Not found | Fallback route with a link home | `app/+not-found.tsx` |

## Configuration

No environment variables. Behaviour is set in `app.json` and `tsconfig.json`:

| Key | Value | Purpose |
|---|---|---|
| `expo.scheme` | `aptrade` | Deep link scheme (`aptrade://`) |
| `expo.web.output` | `static` | Web export is static HTML per route |
| `expo.experiments.typedRoutes` | `true` | Type-checked `href` values for Expo Router |
| `expo.experiments.tsconfigPaths` | `true` | Enables the `~/*` import alias from `tsconfig.json` |
| `expo.userInterfaceStyle` | `light` | Native UI style; screens still paint their own dark backgrounds |
| `expo.orientation` | `portrait` | Locks orientation |

## Design decisions and trade-offs

- **File-based routing over a hand-written navigator.** Expo Router with typed routes means adding a tab is one file plus one `Tabs.Screen` entry.
- **Tailwind classes (NativeWind v4) over `StyleSheet`.** Screens style with `className`; the Babel preset sets `jsxImportSource: "nativewind"`. A few template files still use `StyleSheet`, so both styles coexist.
- **Mock data inline in screens.** Fast for prototyping the UI, but every screen owns its own copy of the token list. Move this to a shared module when the chain client lands.
- **Three icon libraries.** Tabs use `react-native-vector-icons/Ionicons`, shared components use `@expo/vector-icons`, and the Wallet screen uses `react-icons/fa`, which renders SVG for the DOM and is not a React Native component. Expect the Wallet icons to work on web only until they are swapped.
- **Two lockfiles are committed** (`package-lock.json`, `pnpm-lock.yaml`). The scaffold config says npm; use npm to match the README.
- **`react-native-safe-area-context` is pinned** at 4.10.1 and excluded from `expo install` version checks in `package.json`.

## Project layout

```
app/                Expo Router routes
  _layout.tsx       root stack
  (tabs)/           five tab screens + tab bar layout
  +html.tsx         web HTML shell
  +not-found.tsx    404 route
  modal.tsx         registered modal route (currently empty)
components/         shared UI pieces
assets/             icon, adaptive icon, splash, favicon
app.json            Expo app config
babel.config.js     Expo + NativeWind presets
metro.config.js     Metro with NativeWind and global.css
tailwind.config.js  Tailwind content paths + NativeWind preset
cesconfig.json      create-expo-stack scaffold record
```

## Development

```bash
npm run lint      # eslint (universe/native) + prettier --check
npm run format    # eslint --fix + prettier --write
npm run prebuild  # expo prebuild: generates ios/ and android/ (gitignored)
```

There are no tests and no CI workflow yet.

## Roadmap / limitations

- No Aptos or wallet integration; trade and futures actions only log to the console.
- Home and Markets tabs still show the create-expo-stack placeholder.
- `app/modal.tsx` is registered in the root stack but the file is empty.
- The Futures chart is a placeholder `View`; there is no charting dependency.
- Wallet icons come from `react-icons`, which does not render on native.

## Contributing

Open an issue or PR on GitHub. Run `npm run lint` before pushing.

## License

No license file yet.
