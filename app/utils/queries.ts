import prisma from '../prismadb'






export const findPlan = (id: string) => prisma.plan.findFirst({ where: { id } });
export const findUser = (kindeId: string) => prisma.user.findFirst({ where: { kinde_id: kindeId } });


export const findFiatBalance = async (id: string) => {
    const user = await findUser(id);
    if (!user) return new NoUserFoundError();
    return prisma.fiatAc.findFirst({
        where: {
            userId: user.id
        },
        select: {
            account_balance: true
        }
    });
}
export const findCryptoBalance = async (id: string) => {
    const user = await findUser(id);
    if (!user) return new NoUserFoundError();
    return prisma.cryptoAc.findFirst({
        where: {
            userId: user.id
        },
        select: {
            account_balance: true
        }
    });
}

export const userTransactions = async (id: string) => {
    const user = await findUser(id);
    if (!user) return new NoUserFoundError();
    return prisma.transaction.findMany({
        where: {
            userId: user.id
        }
    })

}


// Plan Queries

// GET PLAN
export const getPlanById = async (planId: string) => {
    return prisma.plan.findFirst({
        where: {
            id: planId
        }
    });
};

//   GET USER PLANS
export const getPlansByUser = async (kindeId: string) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.plan.findMany({
        where: {
            userId: user.id
        }
    });
};


//   CREATE PLAN
export const createPlan = async (kindeId: string, data: any) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.plan.create({
        data: {
            ...data,
            userId: user.id
        }
    });
};


//   UPDATE PLAN
export const updatePlan = async (planId: string, data: any) => {
    return prisma.plan.update({
        where: {
            id: planId
        },
        data
    });
};

// DELETE PLAN 
export const deletePlan = async (planId: string) => {
    return prisma.plan.delete({
        where: {
            id: planId
        }
    });
};



// TRANSACTIONS....

export const getTransactionById = async (transactionId: string) => {
    return prisma.transaction.findFirst({
        where: {
            id: transactionId
        }
    });
};

export const getTransactionsByUser = async (kindeId: string) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.transaction.findMany({
        where: {
            userId: user.id
        }
    });
};

export const createTransaction = async (kindeId: string, data: any) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.transaction.create({
        data: {
            ...data,
            userId: user.id
        }
    });
};

export const updateTransaction = async (transactionId: string, data: any) => {
    return prisma.transaction.update({
        where: {
            id: transactionId
        },
        data
    });
};

export const deleteTransaction = async (transactionId: string) => {
    return prisma.transaction.delete({
        where: {
            id: transactionId
        }
    });
};

//   KYC QUERIES


export const getKYCByUser = async (kindeId: string) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.kyc.findFirst({
        where: {
            userId: user.id
        }
    });
};

export const createKYC = async (kindeId: string, data: any) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.kyc.create({
        data: {
            ...data,
            userId: user.id
        }
    });
};

export const updateKYC = async (kycId: string, data: any) => {
    return prisma.kyc.update({
        where: {
            id: kycId
        },
        data
    });
};

export const deleteKYC = async (kycId: string) => {
    return prisma.kyc.delete({
        where: {
            id: kycId
        }
    });
};


//Wallet Queries
export const getFiatAccountByUser = async (kindeId: string) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.fiatAc.findFirst({
        where: {
            userId: user.id
        }
    });
};

export const getCryptoAccountByUser = async (kindeId: string) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.cryptoAc.findFirst({
        where: {
            userId: user.id
        }
    });
};

export const createFiatAccount = async (kindeId: string, data: any) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.fiatAc.create({
        data: {
            ...data,
            userId: user.id
        }
    });
};

export const createCryptoAccount = async (kindeId: string, data: any) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();
    return prisma.cryptoAc.create({
        data: {
            ...data,
            userId: user.id
        }
    });
};

export const updateFiatAccount = async (accountId: string, data: any) => {
    return prisma.fiatAc.update({
        where: {
            id: accountId
        },
        data
    });
};

export const updateCryptoAccount = async (accountId: string, data: any) => {
    return prisma.cryptoAc.update({
        where: {
            id: accountId
        },
        data
    });
};

export const deleteFiatAccount = async (accountId: string) => {
    return prisma.fiatAc.delete({
        where: {
            id: accountId
        }
    });
};

export const deleteCryptoAccount = async (accountId: string) => {
    return prisma.cryptoAc.delete({
        where: {
            id: accountId
        }
    });
};


export const depositFiat = async (kindeId: string, amount: number, description: string) => {
    const user = await findUser(kindeId);
    if (!user) return new NoUserFoundError();

    const fiatAccount = await prisma.fiatAc.findFirst({
        where: {
            userId: user.id
        }
    });
    if (!fiatAccount) return new NoFiatWalletFoundError();

    const currentBalance = fiatAccount.account_balance;
    const newBalance = Number(currentBalance) + Number(amount);

    const transactionData = {
        userId: user.id,
        type: 'credit',
        status: 'completed',
        destination: 'fiat',
        amount,
        description
    };

    const monthHistoryData = {
        userId: user.id,
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        credit: amount,
        debit: 0
    };

    const yearHistoryData = {
        userId: user.id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        credit: amount,
        debit: 0
    };

    const auditLogData = {
        userId: user.id,
        action: 'deposit',
        ipAddress: 'user_ip_address',
        userAgent: 'user_user_agent'
    };

    await prisma.$transaction([
        prisma.fiatAc.update({
            where: {
                id: fiatAccount.id
            },
            data: {
                account_balance: newBalance
            }
        }),
        prisma.transaction.create({
            data: transactionData
        }),
        prisma.monthHistory.upsert({
            where: {
                day_month_year_userId: {
                    userId: user.id,
                    day: monthHistoryData.day,
                    month: monthHistoryData.month,
                    year: monthHistoryData.year
                }
            },
            create: monthHistoryData,
            update: {
                credit: {
                    increment: amount
                }
            }
        }),
        prisma.yearHistory.upsert({
            where: {
                month_year_userId: {
                    userId: user.id,
                    month: yearHistoryData.month,
                    year: yearHistoryData.year
                }
            },
            create: yearHistoryData,
            update: {
                credit: {
                    increment: amount
                }
            }
        }),
        prisma.auditLog.create({
            data: auditLogData
        })
    ]);

    // Replace the above upsert with the following code
    // const existingMonthHistory = await prisma.monthHistory.findUnique({
    //   where: {
    //     userId_day_month_year: {
    //       userId: user.id,
    //       day: monthHistoryData.day,
    //       month: monthHistoryData.month,
    //       year: monthHistoryData.year
    //     }
    //   }
    // });

    // if (existingMonthHistory) {
    //   await prisma.monthHistory.update({
    //     where: {
    //       userId_day_month_year: {
    //         userId: user.id,
    //         day: monthHistoryData.day,
    //         month: monthHistoryData.month,
    //         year: monthHistoryData.year
    //       }
    //     },
    //     data: {
    //       credit: {
    //         increment: amount
    //       }
    //     }
    //   });
    // } else {
    //   await prisma.monthHistory.create({
    //     data: monthHistoryData
    //   });
    // }

    return { message: 'Deposit successful' };
};