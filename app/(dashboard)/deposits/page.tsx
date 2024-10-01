'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import DepositForm from "@/app/components/DepositForm"

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]


}

export default function DemoPage() {
    const data: [] = getData()

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
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        </div>
    )
}
