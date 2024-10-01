"use client";
import React from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import SavingsPlans from '../components/SavingsPlans';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



const Page = () => {
    const { getUser } = useKindeBrowserClient();
    const username = getUser()
    const data = {
        amountContributed: 400,
        totalGoal: 1000,
        label: "Honda Accord"
    };
    return (

        <div >
            <div className="w-full p-3">
                <Card className='w-full bg-white p-4 rounded shadow-md'>
                    <CardHeader>
                        <CardTitle> Welcome <span className='text-blue-500'>{username?.given_name}</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h2 className='text-2xl font-medium'>GHC 2,000.00</h2>
                    </CardContent>

                    {/* Total Savings & Liquidity side-by-side */}
                    <div className="flex lg:flex-row sm:flex-col p-2 gap-4">
                        <div className="flex flex-col">
                            <p className='text-center bg-green-300 text-white p-1 rounded-md'>100</p>
                            <p className='mt-1 font-medium text-sm'>Wallet</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='text-center bg-red-300 text-white p-1 rounded-md'>100</p>
                            <p className='mt-1 font-medium text-sm'>Goals</p>
                        </div>
                    </div>



                </Card>
                {/* If User Has Not Verified */}
                <div className="flex justify-center items-center mt-5">
                    <Card className='w-full h-[100px] p-1  flex items-center justify-center'>
                        <div className='mt-3 flex flex-row justify-between gap-5'>
                            <Image
                                src={'/verified-account.png'}
                                alt={''}
                                width={40}
                                height={20}
                            />

                            <p className='font-medium text-center text-xl text-red-600'> Verify Your Account !</p>
                        </div>
                    </Card>
                </div>

                {/* Savings Goals */}
                <div className="flex flex-row md:flex-col">

                    <Card>
                        <CardHeader>
                            <Link href={'/savings'}>
                                <p className="text-end w-full text-sm mb-3 font-medium text-blue-500">See More</p>

                            </Link>
                            <CardTitle>
                                <div className="flex justify-between">
                                    <p>GOALS</p>
                                    <Button className='font-medium'>Add Goal</Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SavingsPlans data={data} />
                        </CardContent>
                    </Card>
                </div>
            </div>



            {/* <SavingsTile
                account={account}
                planId={account.planId}
                type={'full'} /> */}
        </div>
    )
}

export default Page
