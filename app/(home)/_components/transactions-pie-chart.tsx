"use client";

import { TrendingUp } from "lucide-react";
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

interface TransacionPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransacionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: TransacionPieChartProps) => {
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
    <Card className="flex flex-col bg-gradient-to-bl from-cyan-900 to-gray-900">
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TransacionPieChart;
