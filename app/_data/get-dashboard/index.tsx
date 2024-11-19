import { db } from "@/app/_lib/prisma";

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
  return { depositsTotal, investmentsTotal, expensesTotal, balance };
};
