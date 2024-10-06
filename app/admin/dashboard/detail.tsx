"use client";
import CustomCard from "@/app/(components)/cards";
import { BarData } from "@/app/(components)/charts/bar";
import { Piedata } from "@/app/(components)/charts/pie";
import React from "react";

export const HomePage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <CustomCard
          title="Revenue"
          total="₦28,125"
          // icon={FaDollarSign}
          subtitle="Total sales this month"
        />
        <CustomCard
          title="Orders"
          total="312"
          subtitle="Orders completed this month"
        />

        <CustomCard
          title="Orders"
          total="312"
          subtitle="Orders completed this month"
        />

        <CustomCard
          title="Products"
          total="312"
          subtitle="Total Product in the store"
        />
      </div>
      <div className="my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <BarData />
          <Piedata />
        </div>
      </div>
    </div>
  );
};
