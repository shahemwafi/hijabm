import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ClientUserProfileDropdown from "@/components/ClientUserProfileDropdown";
import { AuthProvider } from "@/contexts/AuthContext";
import MobileNavigation from "@/components/MobileNavigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hijab Marriage Bureau - Dignified Muslim Matchmaking",
  description: "Shariah-compliant matchmaking service for Muslims. Find your soulmate with dignity and respect.",
  keywords: "Muslim marriage, Islamic matchmaking, rishta, hijab marriage bureau",
  authors: [{ name: "Hijab Marriage Bureau" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen`}
      >
        <AuthProvider>
          {/* Enhanced Navigation */}
          <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">H</span>
                    </div>
                    <span className="font-poppins font-semibold text-lg sm:text-xl text-gray-800">
                      Hijab Marriage Bureau
                    </span>
                  </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    About
                  </Link>
                  <Link 
                    href="/pay" 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    Post Rishta
                  </Link>
                  <Link 
                    href="/portfolio" 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    Portfolio
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    Terms
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </div>

                {/* User Profile Dropdown */}
                <div className="flex items-center">
                  <ClientUserProfileDropdown />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <MobileNavigation />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Enhanced Footer */}
          <footer className="bg-gradient-to-r from-green-800 to-blue-800 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">H</span>
                    </div>
                    <span className="font-poppins font-semibold text-lg sm:text-xl">
                      Hijab Marriage Bureau
                    </span>
                  </div>
                  <p className="text-green-100 mb-4 max-w-md text-sm sm:text-base">
                    Dignified, Shariah-compliant matchmaking for Muslims. 
                    Find your soulmate with respect and Islamic values.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-green-100 hover:text-white transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-green-100 hover:text-white transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/about" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">About Us</Link></li>
                    <li><Link href="/pay" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Post Rishta</Link></li>
                    <li><Link href="/portfolio" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Portfolio</Link></li>
                    <li><Link href="/contact" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Contact</Link></li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="font-poppins font-semibold text-lg mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li><Link href="/terms" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Terms of Service</Link></li>
                    <li><Link href="/privacy" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Privacy Policy</Link></li>
                    <li><Link href="/cookies" className="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Cookie Policy</Link></li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-green-700 mt-8 pt-8 text-center">
                <p className="text-green-100 text-sm sm:text-base">
                  &copy; {new Date().getFullYear()} Hijab Marriage Bureau. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
