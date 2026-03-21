"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/constants";
import ValueStack from "./ValueStack";

type PlanKey = keyof typeof PLANS;

export default function PlanSelector() {
  const [activePlan, setActivePlan] = useState<PlanKey>("crescita");
  const plan = PLANS[activePlan];

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {(Object.keys(PLANS) as PlanKey[]).map((key) => {
          const p = PLANS[key];
          const isActive = key === activePlan;
          return (
            <button
              key={key}
              onClick={() => setActivePlan(key)}
              className={`relative flex-1 py-4 px-6 rounded-xl border-2 transition-all duration-300 text-center ${
                isActive
                  ? "border-orbius-gold bg-orbius-gold/10 text-orbius-white"
                  : "border-orbius-gray700/30 bg-orbius-navy2 text-orbius-gray300 hover:border-orbius-gray700/50"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.15em] uppercase bg-orbius-gold text-orbius-navy px-3 py-0.5 rounded-full">
                  {p.badge}
                </span>
              )}
              <div className="text-lg font-extrabold">{p.name}</div>
              <div className="text-orbius-gold text-2xl font-extrabold mt-1">
                &euro;{p.price}
                <span className="text-sm font-normal text-orbius-gray300">
                  /mese
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active plan content */}
      <ValueStack plan={plan} />

      {/* What's included summary */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {plan.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <Check
              size={16}
              className="text-orbius-green shrink-0 mt-0.5"
            />
            <span className="text-orbius-gray100">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
