import { Box, styled } from "@mui/material";

import React from "react";

export default function Index() {
  return <StyleBox>index</StyleBox>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyleBox = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main, // テーマの primary 色を使用
  // borderRadius: theme.shape.borderRadius,     // テーマのボーダー半径を使用

  // themeで分岐を作って当てるスタイルを変更する
  [theme.breakpoints.only("xs")]: {
    padding: theme.spacing(2), // `xs` の場合の padding
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4), // `sm` 以上の場合の padding
  },

  

}));
