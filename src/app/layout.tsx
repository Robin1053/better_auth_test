/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
"use client";

import { NotificationProvider } from "@/Components/ui/NotificationProvider";
import "./globals.css";
import { theme } from "@/theme/mui";
import { Box, ThemeProvider } from "@mui/material";
import { Roboto } from 'next/font/google';
import { AppBar } from "@/Components/ui/AppBar/Appbar";


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
    <html lang="de" suppressHydrationWarning >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
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
          }
          suppressHydrationWarning
        >
          <ThemeProvider theme={theme}>
            <NotificationProvider>
              <AppBar />
              {children}
            </NotificationProvider>
          </ThemeProvider>
        </Box>
      </body>
    </html>
  );
}
