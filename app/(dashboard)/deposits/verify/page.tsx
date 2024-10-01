'use client'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSearchParams } from 'next/navigation'


const Page = () => {
    // const pathname = usePathname();
    // console.log(pathname)
    const searchParams = useSearchParams()

    // const referenceIndex = pathname.indexOf('reference=');
    // const reference = pathname.split('reference=')[1];
    // console.log(reference)
    const search = searchParams.get('reference')

    return (
        <div className='flex justify-center items-center'>
            <Card className='flex justify-center items-center'>
                <CardContent>
                    {search && (
                        <p>Payment Verified with reference: {search}</p>
                    )}
                    {!search && (
                        <p>Payment Verification failed</p>
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