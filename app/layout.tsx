import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
const myFont = localFont({
  src: "../public/assets/font/HelveticaNeueRoman.otf",
});
import "./globals.css";
import { NextThemeProvider } from "@/components/next-theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

// redux - toolkit
import { store } from "@/provider/redux/store";
import ProviderRedux from "@/provider/redux/provider_redux";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export const metadata: Metadata = {
  title: "Demo E-commerce - ABC",
  description: "No description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <ProviderRedux store={store}>
          {/* <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          {children}
          <Toaster />
          {/* </NextThemeProvider> */}
        </ProviderRedux>
      </body>
    </html>
  );
}
