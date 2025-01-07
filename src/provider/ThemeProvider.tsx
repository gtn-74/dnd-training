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


// font.ts
theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

// 使う時、
// Typograhyのvariantに、このスタイルが割り当てられるっぽい

// !
// const customSpacing = (base: number) => (factor: number) => factor * base;

// const theme = createTheme({
//   customSpacing: {
//     cardSpacing: customSpacing(12),
//     sectionMargin: customSpacing(16),
//   },
// });

// // 使用例
// const StyledBox = styled(Box)(({ theme }) => ({
//   padding: theme.customSpacing.cardSpacing(3), // 値は 36 (12 * 3)
//   margin: theme.customSpacing.sectionMargin(2), // 値は 32 (16 * 2)
// }));








console.log(theme.palette.primary.main, 50);

export default function ThemeProvider({ children }: React.PropsWithChildren) {
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
