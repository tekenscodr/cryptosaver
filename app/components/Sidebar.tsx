'use client';
import { useRouter, usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const navLists = [
    { name: 'Home', href: '/' },
    { name: 'Savings', href: '/savings' },
    { name: 'Deposits', href: '/deposits' },
    { name: 'Profile', href: '/profile' }

]

const adminNavLists = [
    ...navLists,

]

const SideNav = () => {
    return (
        <div className=" bg-white">
            <section className=" justify-start ">
                <nav className="flex flex-col justify-between">
                    <div>
                        <ul>
                            <li className="mb-8">
                                <Link href="/" >
                                    <h1 className='font-bold text-3xl'>CryptoSaver</h1>
                                </Link>
                            </li>
                            {adminNavLists.map((item) => (
                                <li key={item.href}>
                                    <NavbarItem
                                        href={item.href}
                                        name={item.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <LogoutLink>
                            <Button
                                className="mt-12 bg-slate-950 text-white rounded hover:bg-slate-600">
                                Logout
                            </Button>
                        </LogoutLink>
                    </div>

                </nav>
            </section>
        </div>
    )
};

function NavbarItem({ href, name }: { href: string, name: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <div className="relative flex items-center">
            <Link
                href={href}
                className={cn('cursor-pointer px-3 py-3 rounded-md transition-colors duration-75 w-full block', {
                    'bg-bank-gradient text-white': isActive,
                    'hover:bg-blue-300/75': true,
                    'hover:!bg-blue-400/75': isActive
                })} >
                {name}
            </Link>
        </div>
    )
}



export default SideNav