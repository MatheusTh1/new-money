"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

// Server action sempre tem que validar e ser protegida por autenticação
export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const { id, ...data } = params;

  console.log("Params recebidos:", params); // Log para debug

  if (id) {
    // Atualizar registro existente
    await db.transaction.update({
      where: { id },
      data: { ...data, userId },
    });
  } else {
    // Criar novo registro
    await db.transaction.create({
      data: { ...data, userId },
    });
  }

  // Revalidação do caminho para refletir as mudanças
  revalidatePath("/transactions");
};
