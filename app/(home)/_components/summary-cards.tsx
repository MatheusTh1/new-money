import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

const SummaryCards = () => {
  return (
    <div className="space-y-6">
      {/* //   {PRIMEIRO CARD} */}
      <Card>
        <CardHeader className="flex-row items-center gap-2">
          <WalletIcon size={16}></WalletIcon>
          <p className="text-white opacity-70">Saldo</p>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">R$ 17.000</p>
        </CardContent>
      </Card>

      {/* {OUTROS CARDS} */}
      <div className="grid grid-cols-3">
        <Card>
          <CardHeader>
            <PiggyBankIcon size={14}></PiggyBankIcon>
            <p className="text-muted-foreground opacity-70">Investido</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 72.000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <TrendingUpIcon size={14}></TrendingUpIcon>
            <p className="text-muted-foreground opacity-70">Receitas</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 22.000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <TrendingDownIcon size={14}></TrendingDownIcon>
            <p className="text-muted-foreground opacity-70">Despesas</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 12.000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryCards;
