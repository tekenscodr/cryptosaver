"use client";
import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import SavingsPlans from '../components/SavingsPlans';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';

const Page = () => {
    const { getUser } = useKindeBrowserClient();
    const username = getUser();
    const [goals, setGoals] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('/api/plan/get-plan');
            const formattedGoals = response.data.data.map((goal: { balance: number; budget: number; plan_name: string; }) => ({
                amountContributed: goal.balance,
                totalGoal: goal.budget,
                label: goal.plan_name,
            }));
            setGoals(formattedGoals);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBalance = async () => {
        try {
            console.log('get')
            const response = await axios.get('/api/balance');
            console.log('WHenev', response.data.data.account_balance);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGoals();
        fetchBalance();
    }, []);

    return (
        <div>
            <div className="w-full p-3">
                <Card className='w-full bg-white p-4 rounded shadow-md'>
                    <CardHeader>
                        <CardTitle> Welcome <span className='text-blue-500'>{username?.given_name}</span></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h2 className='text-2xl font-medium'>Balance: {balance}</h2>
                    </CardContent>

                    {/* Total Savings & Liquidity side-by-side */}
                    <div className="flex lg:flex-row sm:flex-col p-2 gap-4">
                        <div className="flex flex-col">
                            <p className='text-center bg-green-300 text-white p-1 rounded-md'>{balance}</p>
                            <p className='mt-1 font-medium text-sm'>Wallet</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='text-center bg-red-300 text-white p-1 rounded-md'>{goals.reduce((acc, goal) => acc + goal, 0)}</p>
                            <p className='mt-1 font-medium text-sm'>Goals</p>
                        </div>
                    </div>

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
                                {goals.map((goal) => (
                                    <div key={goal}>
                                        <SavingsPlans data={goal} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </Card>
            </div >
        </div >
    );
};

export default Page;