class InsufficientFundsError extends Error {
    constructor() {
        super('Account balance is low');
    }
}

class NoUserFoundError extends Error {
    constructor() {
        super('User Not Found');
    }
}

class NoFiatWalletFoundError extends Error {
    constructor() {
        super('No Fiat wallet exists for this user')
    }
}

class NoCryptoWalletFoundError extends Error {
    constructor() {
        super('No crypto wallet exists for this user')
    }
}