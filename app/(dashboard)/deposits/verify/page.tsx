'use client'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className='flex justify-center items-center'>
            <Card className='flex justify-center items-center'>
                <CardContent>
                    <p>Payment Verified</p>
                    <Link href={'/deposts'}>
                        Back to transactions
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default page