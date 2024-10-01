'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';


function Navbar() {
    return (
        <>
            <DesktopNav />
            <MobileNav />
        </>
    )
}

const navLists = [
    { name: 'Home', href: '/' },
    { name: 'Savings', href: '/savings' },
    { name: 'Deposits', href: '/deposits' },
    { name: 'Profile', href: '/profile' }

]

function DesktopNav() {
    const { isAuthenticated } = useKindeBrowserClient();
    return (
        <div className='hidden md:block'>
            <nav className='boder-b flex items-center pt-2 mb-3 pb-4 border-b-2'>
                <div className='container flex items-center justify-between'>
                    <Link href="/">
                        <h1 className='font-bold text-3xl'>CryptoSaver</h1>
                    </Link>
                </div>

                <div className='flex items-center gap-x-5 text-black'>
                    {(isAuthenticated) ? (
                        <>
                            {
                                navLists.map(item => (
                                    <NavbarItem
                                        key={item.name}
                                        link={item.href}
                                        label={item.name}
                                    />

                                ))
                            }


                            < div className='flex items-center gap-x-5'>
                                <LogoutLink >
                                    <Button className='bg-black text-white'>
                                        Logout
                                    </Button>
                                </LogoutLink>
                            </div>
                        </>
                    ) : (

                        <div className='flex items-center gap-x-5'>
                            <LoginLink postLoginRedirectURL='/'>
                                <Button className='bg-black text-white'>
                                    Login
                                </Button>
                            </LoginLink>
                            <RegisterLink postLoginRedirectURL='/'>
                                <Button className='bg-black text-white'>
                                    Register
                                </Button>
                            </RegisterLink>

                        </div>
                    )}
                </div>

            </nav >
        </div >
    )
}

function NavbarItem({ link, label }: {
    link: string,
    label: string,
}) {
    const pathname = usePathname();
    const isActive = pathname === link;
    return (
        <div className='relative flex items-center '>
            <Link href={link} className={cn(buttonVariants({
                variant: 'ghost'
            }),
                "w-full justify-start text-lg text-black hover:text-black",
                isActive && 'text-black '
            )}>
                {label}
            </Link>
            {isActive && (
                <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-black md:block'></div>
            )}
        </div>
    )

}

function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='block border-separate bg-background md:hidden'>
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={'ghost'} size={"icon"}>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px] bg-white" side='left'>
                        <Link href="/" >
                            <h1 className='font-bold text-3xl'>CryptoSaver</h1>
                        </Link>
                        <ul>
                            {navLists.map((item) => (
                                <li key={item.href}>
                                    <NavbarItem
                                        link={item.href}
                                        label={item.name}
                                    />
                                </li>
                            ))}
                        </ul>
                        <LogoutLink>
                            <Button
                                className="mt-12 bg-slate-950 text-white rounded hover:bg-slate-600">
                                Logout
                            </Button>
                        </LogoutLink>
                    </SheetContent>
                </Sheet>
            </nav>

        </div>
    )
}

export default Navbar