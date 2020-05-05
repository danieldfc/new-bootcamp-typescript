import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    category,
    type,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('This is value invalid');
    }

    const categoriesRepository = getRepository(Category);

    let categoryVerify = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoryVerify) {
      categoryVerify = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryVerify);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: categoryVerify.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
