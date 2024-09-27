import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"
import { MyContextProvider } from "@/Context/Context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to DaanRakto",
  description: "DaanRakto is a digital platform for helping people with blood donate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyContextProvider>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="mb-16">
              <Header />
            </div>
            <div className="min-h-[300px]">
              {children}
              <Toaster />
            </div>
            <Footer />
          </ThemeProvider>
        </MyContextProvider>
      </body>
    </html>
  );
}
