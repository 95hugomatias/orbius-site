import { Check } from "lucide-react";

interface ValueStackItem {
  label: string;
  value: number;
}

interface Plan {
  name: string;
  price: number;
  badge: string | null;
  totalValue: number;
  items: readonly ValueStackItem[];
}

interface ValueStackProps {
  plan: Plan;
}

export default function ValueStack({ plan }: ValueStackProps) {
  return (
    <div className="rounded-xl border border-orbius-gray700/25 bg-orbius-navy2 p-6 sm:p-8">
      <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-orbius-gray500 mb-6">
        Cosa Include — {plan.name}
      </h4>

      <div className="space-y-4">
        {plan.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 pb-4 border-b border-orbius-gray700/15 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-3">
              <Check
                size={16}
                className="text-orbius-green shrink-0 mt-0.5"
              />
              <span className="text-orbius-gray100 text-sm">{item.label}</span>
            </div>
            <span className="text-orbius-gray500 text-sm line-through shrink-0">
              &euro;{item.value}/m
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-6 border-t border-orbius-gray700/25 flex items-end justify-between">
        <div>
          <p className="text-orbius-gray500 text-xs mb-1">Valore totale</p>
          <p className="text-orbius-gray300 text-xl line-through">
            &euro;{plan.totalValue}/mese
          </p>
        </div>
        <div className="text-right">
          <p className="text-orbius-gray500 text-xs mb-1">Il tuo prezzo</p>
          <p className="text-orbius-gold text-3xl font-extrabold">
            &euro;{plan.price}
            <span className="text-base font-normal text-orbius-gray300">
              /mese
            </span>
          </p>
        </div>
      </div>

      {/* Savings */}
      <div className="mt-4 text-center">
        <span className="inline-block bg-orbius-green/10 text-orbius-green text-sm font-semibold px-4 py-2 rounded-full">
          Risparmi il{" "}
          {Math.round(((plan.totalValue - plan.price) / plan.totalValue) * 100)}
          % rispetto al valore reale
        </span>
      </div>
    </div>
  );
}
