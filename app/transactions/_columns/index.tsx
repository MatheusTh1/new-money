"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted text-primary font-bold hover:bg-muted">
            <CircleIcon className="fill-primary mr-2" size={10} />
            Receita
          </Badge>
        );
      }
      if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="font-bold text-danger bg-danger bg-opacity-10 hover:bg-muted">
            <CircleIcon className="fill-danger mr-2" size={10} />
            Despesas
          </Badge>
        );
      }
      return (
        <Badge className="font-bold text-white bg-white bg-opacity-10 hover:bg-muted">
          <CircleIcon className="fill-white mr-2" size={10} />
          Investimento
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
