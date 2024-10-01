'use client'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Page = () => {
    const pathname = usePathname();
    const hasReference = pathname.includes('reference=');

    return (
        <div className='flex justify-center items-center'>
            <Card className='flex justify-center items-center'>
                <CardContent>
                    {hasReference && (
                        <p>Payment Verified with reference: {pathname.split('reference=')[1]}</p>
                    )}
                    {!hasReference && (
                        <p>Payment Verified</p>
                    )}
                    <Link href={'/deposts'}>
                        Back to transactions
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page