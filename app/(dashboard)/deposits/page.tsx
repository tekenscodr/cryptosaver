'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import DepositForm from "@/app/components/DepositForm"
import prisma from '../../prismadb'; // Import your Prisma client
import { useEffect, useState } from "react"
import axios from "axios"

async function getData(): Promise<Payment[]> {
    const transaction = await axios.get('/api/transactions')
    if (!transaction.data === null) console.log('make deposit');
    console.log(transaction)

    return Array.from(transaction.data).map((transaction: any) => ({
        id: transaction.id.slice(0, 6),
        amount: Number(transaction.amount),
        status: transaction.status,
        email: transaction.userId,
    }));
}
export default function DemoPage() {

    const [data, setData] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const payments = await getData();
            setData(payments);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleFormSubmit = async () => {
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p>Transactions</p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Open</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Make A Deposit</SheetTitle>
                                        <SheetDescription>
                                        </SheetDescription>
                                    </SheetHeader>
                                    <DepositForm onFormSubmit={handleFormSubmit} />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <DataTable columns={columns} data={data} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}