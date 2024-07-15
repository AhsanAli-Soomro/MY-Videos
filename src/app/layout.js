import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { VideosProvider } from "./contexts/VideoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VideosProvider>
          <Navbar />
          {children}

        </VideosProvider>
      </body>
    </html>
  );
}
