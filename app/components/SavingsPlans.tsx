import React from 'react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ContributionProgressProps {
    data: {
        amountContributed: number;
        totalGoal: number;
        label: string;
    };
}

const SavingsPlans: React.FC<ContributionProgressProps> = ({ data }) => {
    const { amountContributed, totalGoal, label } = data;
    const percentage = (Number(amountContributed) / Number(totalGoal)) * 100;

    return (
        <div className="mb-4 flex items-center">
            <div className="flex-1">
                <h4 className="text-lg font-medium mb-2">{label}</h4>
                <div className="bg-gray-200 h-2 relative">
                    <div
                        className="bg-green-500 h-2 absolute left-0 top-0"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                </div>
                <div className="flex justify-between text-gray-600 text-sm mt-2">
                    <span>
                        GHC{Number(amountContributed)} / {Number(totalGoal)}
                    </span>
                    <span>
                        {percentage.toFixed(2)}%
                    </span>
                </div>
            </div>
            <div className="ml-4 text-gray-600">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Make Contribution</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Contribute
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default SavingsPlans;