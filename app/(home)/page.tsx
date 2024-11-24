import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransacionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";

// Definir o tipo de dados que o componente Home espera receber
interface HomeProps {
  searchParams: { month: string };
}

// Validar se o usuário está logado e redirecionar caso não esteja
const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  // Validar se o mês é inválido e redirecionar para o mês corrente caso seja
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    // Redirecionar para o mês atual caso o mês da URL seja inválido
    const currentMonth = new Date().getMonth() + 1;
    redirect(`/?month=${currentMonth}`);
  }

  const dashboard = await getDashboard(month);

  // Acessar os dados do banco de dados e renderizar o dashboard
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard </h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} {...dashboard} />

            {/* Grafico de pizza */}
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransacionPieChart {...dashboard} />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Home;
