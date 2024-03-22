import "@/styles/globals.css";
import type { AppProps } from "next/app";

import AppBar from "@/components/AppBar/AppBar";

import AuthProvider from "@/provider/AuthProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppBar />
      <Box>
        <Component {...pageProps} />
      </Box>
    </AuthProvider>
  );
}
