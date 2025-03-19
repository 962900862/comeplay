import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-[#0F0F15] bg-gray-50">
      <Navbar />
      <main className="pt-16 overflow-x-hidden min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
} 