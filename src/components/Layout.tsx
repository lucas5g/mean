import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface Props {
  children: ReactNode;
}
export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen text-white bg-gray-800">
      <Navbar />
      <main className="p-10 space-y-3 lg:p-20 lg:pt-16">{children}</main>
    </div>
  );
}
