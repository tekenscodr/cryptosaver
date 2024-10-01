'use client'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');

    return (
        <div className='flex justify-center items-center'>
            <Card className='flex justify-center items-center'>
                <CardContent>
                    {reference && (
                        <p>Payment Verified with reference: {reference}</p>
                    )}
                    {!reference && (
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