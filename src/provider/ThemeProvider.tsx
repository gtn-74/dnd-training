import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";

// カスタムテーマの作成
const theme = createTheme({
  palette: {
    primary: {
      50: "blue",
    },
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        // secondaryのスタイルをカスタマイズ
        colorSecondary: {
          "&.Mui-checked": {
            color: "blue", // チェックされた状態のアイコンの色
          },
          // "&.Mui-checked + .MuiSwitch-track": {
          //   backgroundColor: "blue", // チェックされた状態のスライダー背景色
          // },
        },
      },
    },
  },
});

interface ThemeType {
  children: React.ReactNode;
}

console.log(theme.palette.primary.main, 50);

export default function ThemeProvider({ children }: ThemeType) {
  return <Provider theme={theme}>{children}</Provider>;
}

// import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";

// // カスタムテーマの作成
// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: "#ff5722", // secondaryのデフォルト色
//     },
//   },
//   components: {
//     MuiSwitch: {
//       styleOverrides: {
//         // secondaryのスタイルをカスタマイズ
//         colorSecondary: {
//           "&.Mui-checked": {
//             color: "blue", // チェックされた状態のアイコンの色
//           },
//           "&.Mui-checked + .MuiSwitch-track": {
//             backgroundColor: "blue", // チェックされた状態のスライダー背景色
//           },
//         },
//       },
//     },
//   },
// });

// interface ThemeType {
//   children: React.ReactNode;
// }

// export default function ThemeProvider({ children }: ThemeType) {
//   return <Provider theme={theme}>{children}</Provider>;
// }
