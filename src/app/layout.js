import './globals.css';           // Import global CSS including Tailwind
import Sidebar from '../components/Sidebar';  // Import Sidebar component
import { Geist, Geist_Mono } from 'next/font/google';

// Fonts setup (keep as is)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar />  {/* Sidebar on the left */}
          <main className="flex-1 p-8">
            {children} {/* Your page content */}
          </main>
        </div>
      </body>
    </html>
  );
}
