// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name, initialDeposit){
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        return newAccount;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    deposit(amount) {
        if (amount <= 0) {
            console.log("Deposit amount must be a value greater than 0.");
            return;
        }
        this.balance += amount;
        this.transactionHistory.push({ transactionType: 'Deposit', amount: amount });
        console.log(`$${amount} deposited to ${this.name}'s account.`);
    }
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    // Example: withdraw(amount)
    withdraw(amount){
        if (amount > this.balance){
            console.log("Insufficient funds.");
            return;
        }
        this.balance -= amount;
        this.transactionHistory.push({ transactionType: 'Withdrawal', amount: amount });
        console.log(`$${amount} withdrawn from ${this.name}'s account.`);
    }
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

    // Example: transfer(amount, recipientAccount)
    transfer(amount, recipientAccount){
        if(amount > this.balance){
            console.log("Insufficient funds for transfer.");
            return;
        }
        // example data to be stored in transactionHistory:
      // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
        this.balance -= amount;
        recipientAccount.balance += amount;

        this.transactionHistory.push({ transactionType: 'Transfer', amount: amount, to: recipientAccount.name });
    
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
        recipientAccount.transactionHistory.push({ transactionType: 'Received', amount: amount, from: this.name });
        console.log(`$${amount} tranferred from ${this.name} to ${recipientAccount.name}.`)
    }
    // Example: checkBalance()
    checkBalance() {
        console.log(`${this.name}'s Balance: $${this.balance}.`);
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
