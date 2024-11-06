
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopNavBar from "@/components/nav";
import bgimg from '../../assets/assets/3colorbg.png'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nasi Paipon",
  description: "The Tasty House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-black antialiased`}
      >
        <TopNavBar/>
      

        <div  className={` bg-fixed h-[100vh] overflow-y-auto wallpaper absolute  w-screen`}>
          <div  className="h-[100vh] w-full overflow-y-auto absolute bg-black bg-opacity-40">
      
          <img alt="background"  src={bgimg.src} className="w-full h-full bg-cover fixed -z-10"/>
    


          {children}


          </div>
        </div>


      </body>
    </html>
  );
}
