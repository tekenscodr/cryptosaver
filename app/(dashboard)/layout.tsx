'use client'
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "../components/Navbar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            <div className="flex flex-col w-full max-h-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="">
                    {children}
                    <Toaster />
                </div>
            </div>
        </main>
    );
}