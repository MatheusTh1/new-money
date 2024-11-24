"use client";

import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/type";
import PercentageItems from "./percentage-items";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investimento",
    icon: TrendingUp,
    color: "#FFFFFF",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    icon: TrendingUp,
    color: "#55b02e",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    icon: TrendingUp,
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  typesPercentages: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransacionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentages,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55b02e",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className=" flex flex-col bg-gradient-to-bl from-cyan-900 to-gray-900">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráfico mensal</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>

          {/* porcentagem das transações por categoria no gráfico */}
        </ChartContainer>
        <div className="space-y-2">
          {/* Receitas  */}
          <PercentageItems
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receitas"
            value={typesPercentages[TransactionType.DEPOSIT]}
          />

          {/* Despesas  */}
          <PercentageItems
            icon={<TrendingDownIcon size={16} className="text-danger" />}
            title="Despesas"
            value={typesPercentages[TransactionType.EXPENSE]}
          />

          {/* Investimentos  */}
          <PercentageItems
            icon={<PiggyBankIcon size={16} className="text-blue-700" />}
            title="Investimentos"
            value={typesPercentages[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransacionPieChart;
