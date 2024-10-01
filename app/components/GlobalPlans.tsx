'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Wallet2Icon } from 'lucide-react'
import React from 'react'

// const getGlobalPlans = async () => {
//     // Get Data From Server on the Global Plans
// }

const GlobalPlans = () => {
    // const data = await getGlobalPlans()
    return (
        <div className=' mt-4'>
            <h1 className=' text-xl font-medium'>Try theses plans to help you save</h1>
            <div className="flex">
                <div className="mt-3 flex md:flex-row flex-col gap-3">
                    <div className="flex-col justify-center">
                        <Card>
                            <CardHeader className='font-medium text-lg'>
                                <div className="flex- justify-center">
                                    <span>
                                        <Wallet2Icon />
                                    </span>
                                    Weekly Savings
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-medium text-gray-700">Save a specified amount of your salary and recieve your money in USD</p>
                                <Button className='bg-indigo-700 text-white hover:bg-indigo-500 mt-1'>Add Plan</Button>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="flex-col justify-center">
                        <Card>
                            <CardHeader className='font-medium text-lg'>
                                <div className="flex- justify-center">
                                    <span>
                                        <Wallet2Icon />
                                    </span>
                                    Monthly Savings
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-medium text-gray-700">Save a specified amount of your salary and recieve your money in USD</p>
                                <Button className='bg-indigo-700 text-white hover:bg-indigo-500 mt-1'>Add Plan</Button>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="flex-col justify-center">
                        <Card>
                            <CardHeader className='font-medium text-lg'>
                                <div className="flex- justify-center">
                                    <span>
                                        <Wallet2Icon />
                                    </span>
                                    1/2 a year Savings
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-medium text-gray-700">Save a specified amount of your salary and recieve your money in USD</p>
                                <Button className='bg-indigo-700 text-white hover:bg-indigo-500 mt-1'>Add Plan</Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalPlans