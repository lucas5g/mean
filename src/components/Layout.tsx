import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface Props {
  children: ReactNode
}
export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen space-y-6 text-white bg-gray-800">
      <Navbar />
      <main className="p-10 space-y-5 lg:p-20" >
        {children}
      </main>
    </div>
  )
}