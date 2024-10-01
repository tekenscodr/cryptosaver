'use client'
import { PlanForm } from '@/app/components/PlanForm';
import SavingsPlans from '@/app/components/SavingsPlans';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Savings = () => {
    const [goals, setGoals] = useState([]);
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

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleFormSubmit = async () => {
        await fetchGoals();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p>GOALS</p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Open</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you&apos;re done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <PlanForm onFormSubmit={handleFormSubmit} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>

                    <SavingsPlans data={goals} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Savings;