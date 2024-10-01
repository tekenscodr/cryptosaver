import React from 'react'
import { formatAmount } from '../lib/utils'
import DoughnutChart from './DoughnutChart'

const TotalBalance = ({
    accounts = [], totalPlans, totalCurrentBalance
}: TotalBalanceBoxProps) => {
    return (
        <section className='total-balance'>
            <div className="total-balance-chart">
                {/* Chart */}
                <DoughnutChart accounts={accounts} />
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Saving Plans: {totalPlans}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className='total-balance-label'>
                        Total Current Balance
                    </p>
                    <p className="total-balance-amount flex-center gap-2">
                        {totalCurrentBalance}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default TotalBalance