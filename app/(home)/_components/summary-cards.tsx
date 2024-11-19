import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  month: string;
  balance: number;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  investmentsTotal,
  depositsTotal,
  expensesTotal,
}: SummaryCards) => {
  // renderizando os cards com os valores obtidos do banco de dados
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
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title={"Receitas"}
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title={"Despesas"}
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
