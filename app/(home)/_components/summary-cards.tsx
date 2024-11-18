import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

const SummaryCards = async () => {
  // pegando os valores do banco de dados
  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investimentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensiveTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = depositTotal - investimentsTotal - expensiveTotal;

  return (
    <div className="space-y-6">
      {/* //   {PRIMEIRO CARD} */}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title={"Saldo"}
        amount={balance}
        size="large"
      />

      {/* {OUTROS CARDS} */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} className="text-blue-700" />}
          title={"Investido"}
          amount={investimentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title={"Receitas"}
          amount={depositTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title={"Despesas"}
          amount={expensiveTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
