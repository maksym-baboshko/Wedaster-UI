import { Geist, Geist_Mono } from "next/font/google"

import "@wedaster/theme-default/styles.css"
import "@wedaster/ui-web/styles.css"
import "@wedaster/ui-web/base.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@wedaster/ui-web/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
