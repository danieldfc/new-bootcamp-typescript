import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string } | null;
  created_at: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({
    income: 0,
    outcome: 0,
    total: 0,
  } as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('transactions');

      const transactionsAll: Transaction[] = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedDate: format(parseISO(transaction.created_at), 'dd/MM/yy'),
        }),
      );

      const balanceAll = response.data.balance;

      setTransactions(transactionsAll);
      setBalance(balanceAll);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map(
                  ({ id, title, type, value, category, formattedDate }) => (
                    <tr key={id}>
                      <td className={title}>{title}</td>
                      <td className={type}>
                        {`${
                          type === 'income'
                            ? formatValue(value)
                            : `- ${formatValue(value)}`
                        }`}
                      </td>
                      <td>{category ? category.title : 'Nenhum'}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
