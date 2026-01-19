import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a chai - Fund your projects",
  description: "This website is a crowdfunding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <SessionWrapper>
          <div className="min-h-[100dvh] flex flex-col">

            <Navbar />

            <main className="flex-1 text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              {children}
            </main>


            <Footer />

          </div>
          <ToastContainer />
        </SessionWrapper>

      </body>
    </html>
  );
}
