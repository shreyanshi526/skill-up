'use client';

import './globals.css';
import { Poppins, Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './context/SocketContext';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';  // You'll need to create this
import { PersistGate } from 'redux-persist/integration/react';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                  {children}
              </ThemeProvider>
            </QueryClientProvider>
          </SocketProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
