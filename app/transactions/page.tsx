import { db } from "../_lib/prisma";

const TransactionsPage = async () => {
  // acessar as transações do meu banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <div>
      {transactions.map((transactions) => (
        <div key={transactions.id}>{transactions.name}</div>
      ))}
    </div>
  );
};

export default TransactionsPage;
