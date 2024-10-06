import React from "react";

interface CardProps {
  title: string;
  total: any;
  icon?: React.ReactNode;
  subtitle: string;
}

const CustomCard: React.FC<CardProps> = ({ title, total, icon, subtitle }) => {
  return (
    <div
      className="bg-white shadow rounded-lg p-4"
      x-chunk="dashboard-01-chunk-0"
    >
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-md font-medium">{title}</h2>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="text-3xl font-bold text-customPrimary">{total}</div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
};

export default CustomCard;
