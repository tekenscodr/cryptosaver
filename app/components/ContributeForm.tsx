'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Select from 'react-select';
import axios from "axios";

interface PlanFormProps {
    onFormSubmit: () => void;
}

const FormSchema = z.object({
    amount: z.number().min(1, "Budget is required"),
});

export function ContributeForm({ onFormSubmit }: PlanFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            amount: 0,
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const plan = await axios.post('/api/deposit/contribute', data);
            console.log(plan.data);
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md p-4 text-white">
                        <p>SUCCESS</p>
                    </pre>
                ),
            });
            onFormSubmit();
        } catch (error: any) {
            if (error.response) {
                // Handle API response errors
                toast({
                    title: "Plan not submitted:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-red-800 p-4 text-white">
                            <p>FAILED</p>
                            <p> {error.response.data}</p>
                        </pre>
                    ),
                });
            } else if (error.request) {
                // Handle network errors
                toast({
                    title: "Network error:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-red-800 p-4 text-white">
                            <p>NETWORK ERROR</p>
                            <p> {error.message}</p>
                        </pre>
                    ),
                });
            } else {
                // Handle other errors
                toast({
                    title: "Unknown error:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-red-800 p-4 text-white">
                            <p>UNKNOWN ERROR</p>
                            <p> {error.message}</p>
                        </pre>
                    ),
                });
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Amount</FormLabel>
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
                <Button type="submit" className="bg-blue-600 hover:bg-indigo-600 text-white">Submit</Button>
            </form>
        </Form>

    )
}