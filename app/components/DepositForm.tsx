'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";


interface PlanFormProps {
    onFormSubmit: () => void;
}

const FormSchema = z.object({
    description: z.string().min(1, "Description is required"),
    amount: z.number().min(1, "Amount is required"),
    destination: z.string(),
});



export default function DepositForm({ onFormSubmit }: PlanFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: "",
            amount: 0,
            destination: "Fiat",
        },
    });



    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const deposit = await axios.post('/api/paystack/', data)
            const new_data = { ...data, type: "credit", status: 'Completed', destination: "Fiat", description: data.description }
            const transaction = await axios.post('/api/deposit/', new_data)
            console.log(deposit.data.responseData.data.authorization_url)
            console.log(transaction)

            router.push(`${deposit.data.responseData.data.authorization_url}`)
            toast({
                title: "You submitted the following values:",

            });
            onFormSubmit();
        } catch (error: any) {
            toast({
                title: "Plan not submitted:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-red-800 p-4 text-white">
                        <p>Failed</p>
                        <p> {error.message}</p>
                    </pre>
                ),
            });
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                                <input
                                    {...form.register("amount", { valueAsNumber: true })}
                                    type="number"
                                    className="w-full rounded-md border border-gray-700 bg-gray-50 p-2"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <input
                                    {...form.register("description")}
                                    type="text"
                                    className="w-full rounded-md border border-gray-700 bg-gray-50 p-2"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />




                <Button type="submit" className="bg-blue-600 hover:bg-indigo-600 text-white">Submit</Button>
            </form>
        </Form>
    )
}

