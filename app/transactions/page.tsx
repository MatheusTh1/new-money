import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";

const TransactionsPage = async () => {
  // acessar as transações do meu banco de dados
  const transactions = await db.transaction.findMany({});
  return (
    <>
      <NavBar />
      <div className=" p-6 space-y-6">
        {/* {TITULO E BOTAO} */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionsColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
