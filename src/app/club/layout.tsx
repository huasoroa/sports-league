import React from 'react';

import Navbar from '@/components/navbar';

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
}
