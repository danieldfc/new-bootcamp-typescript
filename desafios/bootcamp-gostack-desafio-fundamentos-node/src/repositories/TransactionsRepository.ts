import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance = {
    income: 0,
    outcome: 0,
    total: 0,
  };

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'income') {
      this.balance.income += value;
    } else if (type === 'outcome') {
      this.balance.outcome += value;
    }

    this.balance.total = this.balance.income - this.balance.outcome;

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
