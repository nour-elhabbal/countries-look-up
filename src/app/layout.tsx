import type { Metadata } from "next";

import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Countries",
  description: "Countries look up ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={``}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
