import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Find your place to live",
  description: "An app to help you find the best place to live based on your preferences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Link href={"/"}>
            <div className="z-10 m-5 p-3 absolute top-2 left-2 bg-white rounded-full border-2 shadow-lg border-solid border-[#9f9f9f] dark:border-[#4a4a4a] dark:bg-[#1e1e1e]">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
            </div>
          </Link>
          <Link href={"/quiz"}>
            <div 
              className="m-6 p-2 ps-11 top-2 z-0 absolute bg-white rounded-3xl border-2 shadow-lg border-solid border-[#9f9f9f] dark:border-[#4a4a4a] dark:bg-[#1e1e1e]"
              style={{
                left: '1.2rem',
              }}
            >
              <p className="font-bold">New Quiz</p>
            </div>
          </Link>
        </header>
        {children}
        <footer>
          <p className="text-center text-sm text-gray-500">
            Made using wikijs, cheerio, Next.js, REST Countries API and wikipedia.
          </p>
        </footer>
      </body>
    </html>
  );
}
