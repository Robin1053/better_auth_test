"use client";

import "./globals.css";
import { theme } from "@/theme/mui";
import { Box, ThemeProvider } from "@mui/material";
import { Roboto } from 'next/font/google';

const RobotoFont = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="de">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />
      </head>
      <body>
        <Box
          className={RobotoFont.className}
          sx={
            {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              height: "100vh",
              width: "100vw",
            }
          }>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </Box>
      </body>
    </html>
  );
}
