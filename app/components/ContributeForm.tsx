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
import { DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface PlanFormProps {
    onFormSubmit: () => void;
    plan_id: string;
}

const FormSchema = z.object({
    amount: z.number().min(1, "Budget is required"),
    plan: z.string()
});

export function ContributeForm({ onFormSubmit, plan_id }: PlanFormProps) {
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
            if(!plan){
                toast({
                    title: "Failed",
                    description: (
                        <p>Awwnnn failed</p>
                    ),
                })
            } 
            console.log(plan_id)
            toast({
                title: "SUCCESS",
                description: (
                    <p>Hurray</p>
                ),
            });
            onFormSubmit();
        } catch (error: any) {
            if (error.response) {
                // Handle API response errors
                toast({
                    title: "FAILED",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-red-800 p-4 text-white">
                            <p>FAILED</p>
                            <p> {error.response.data.message || error.response.data.error}</p>
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
        <DialogContent>
            <DialogTitle>Make A Contribution To Your Goal</DialogTitle>

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
                    <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormControl>
                                    <input
                                        {...form.register("plan")}
                                        type="hidden"
                                        value={plan_id}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <DialogClose asChild>
                        <Button type="submit" className="bg-blue-600 hover:bg-indigo-600 text-white">Submit</Button>
                    </DialogClose>
                </form>
            </Form>
        </DialogContent>

    )
}