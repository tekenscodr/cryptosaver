import React from 'react';
import { MoreVertical } from 'lucide-react';

interface ContributionProgressProps {
    data: {
        amountContributed: number;
        totalGoal: number;
        label: string;
    };
}

const SavingsPlans: React.FC<ContributionProgressProps> = ({ data }) => {
    const { amountContributed, totalGoal, label } = data;
    const percentage = (amountContributed / totalGoal) * 100;

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
                        GHC{amountContributed} / GHC{totalGoal}
                    </span>
                    <span>
                        {percentage.toFixed(2)}%
                    </span>
                </div>
            </div>
            <div className="ml-4 text-gray-600">
                <MoreVertical size={20} />
            </div>
        </div>
    );
};

export default SavingsPlans;