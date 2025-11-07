import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';

import { Provider } from '@/components/ui/providers';
import Header from '@/components/Header';
import { ChakraThemeRegistry } from './chakra-theme-registry';

export const metadata: Metadata = {
  title: 'Countries',
  description: 'Countries look up',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={``}>
        <NextTopLoader
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        />
        <ChakraThemeRegistry>
          <Provider>
            <Header />
            {children}
          </Provider>
        </ChakraThemeRegistry>
      </body>
    </html>
  );
}
