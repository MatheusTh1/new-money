import { ReactNode } from "react";

interface PercentageItemsProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItems = ({ icon, title, value }: PercentageItemsProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* {ICONE} */}
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/* Verifique se `typesPercentage` está carregado */}
      <p className="text-sm font-bold ">{value} %</p>
    </div>
  );
};

export default PercentageItems;
