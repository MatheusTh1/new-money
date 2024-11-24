"use client";

import { TrendingUp, TrendingUpIcon } from "lucide-react";
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
          <div className="flex justify-between items-center">
            {/* {ICONE} */}
            <div className="flex items-center gap-2">
              <TrendingUpIcon size={16} className="text-primary" />
              <p className="text-sm text-muted-foreground">Receita</p>
            </div>
            {/* Verifique se `typesPercentage` está carregado */}
          </div>
          <p className="text-sm font-bold ">
            {typesPercentages?.[TransactionType.DEPOSIT] ?? "N/A"} %
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransacionPieChart;
