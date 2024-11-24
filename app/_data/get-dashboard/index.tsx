import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./type";

// Função assíncrona para pegar os dados do banco de dados QUERIES
export const getDashboard = async (month: string) => {
  // construção do where para filtrar as transações do mês
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };

  // pegando os valores do banco de dados para cada categoria
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  // calculando o saldo final com base nas transações do mês
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  // pegando o total de transações do mês
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount || 0,
  );

  // pegando o total de transações do mês e a porcentagem de cada categoria e removendo os numeros decimais
  const typesPercentages: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: transactionsTotal
      ? Math.round((Number(depositsTotal || 0) / transactionsTotal) * 100)
      : 0,
    [TransactionType.INVESTMENT]: transactionsTotal
      ? Math.round((Number(investmentsTotal || 0) / transactionsTotal) * 100)
      : 0,
    [TransactionType.EXPENSE]: transactionsTotal
      ? Math.round((Number(expensesTotal || 0) / transactionsTotal) * 100)
      : 0,
  };

  // retornando os dados do banco de dados
  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentages,
  };
};
