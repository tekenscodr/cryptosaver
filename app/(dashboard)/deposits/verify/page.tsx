import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSearchParams } from 'next/navigation'


const Page = ({ searchParams }: any) => {



    return (
        <div className='flex justify-center items-center'>
            <Card className='flex justify-center items-center'>
                <CardContent>

                    <p>Payment Verification succes {searchParams.reference}</p>

                    <Link href={'/deposts'}>
                        Back to transactions
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page