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
    plan_name: z.string().min(1, "Plan name is required"),
    description: z.string().min(1, "Description is required"),
    budget: z.number().min(1, "Budget is required"),
    starting_date: z.preprocess((arg) => {
        // Convert string to Date
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
    duration: z.string(),
});

export function PlanForm({ onFormSubmit }: PlanFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            plan_name: "",
            description: "",
            budget: 0,
            starting_date: new Date(),
            duration: "",
        },
    });

    const options = [
        { value: '1 month', label: 'Simple' },
        { value: '6 month', label: 'Semi' },
        { value: '1 year', label: 'Gold' },

    ]


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {

            const plan = await axios.post('/api/plan/add-plan', data)
            console.log(plan.data)
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
            toast({
                title: "Plan not submitted:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-red-800 p-4 text-white">
                        <p>FAILED</p>
                        <p> {error}</p>
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
                    name="plan_name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Plan Name</FormLabel>
                            <FormControl>
                                <input
                                    {...form.register("plan_name")}
                                    type="text"
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
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <textarea
                                    {...form.register("description")}
                                    rows={4}
                                    className="w-full rounded-md border border-gray-700 bg-gray-50 p-2"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                                <input
                                    {...form.register("budget", { valueAsNumber: true })}
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
                    name="starting_date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Starting Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }

                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Duration</FormLabel>
                            <Select
                                className="mt-2"
                                options={options}
                                onChange={(option) => field.onChange(option?.value)}
                                isSearchable
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-indigo-600 text-white">Submit</Button>
            </form>
        </Form>

    )
}