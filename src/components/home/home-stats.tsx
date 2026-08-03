import { Plus } from "lucide-react";

interface HomeStatsProps {
  bonuses: number;
  currency: string;
  orders: number;
}

export function HomeStats({ bonuses, currency, orders }: HomeStatsProps) {
  return (
    <div className="flex w-full shrink-0 items-center px-6 py-4">
      <div className="flex flex-1 items-center border-t border-white/24">
        <div className="flex flex-1 flex-col gap-1.5 border-r border-white/24 pt-3 pb-4 opacity-[0.96]">
          <p className="font-sans text-sm leading-5 font-medium tracking-[-0.14px] text-hs-neutral-0">
            Bonuses
          </p>
          <div className="flex items-start gap-2">
            <p className="font-alumni text-7xl leading-[0.66] font-semibold tracking-[-0.72px] text-hs-neutral-0">
              {bonuses}
            </p>
            <span className="font-alumni text-4xl leading-5 font-semibold text-hs-neutral-0">
              {currency}
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-end gap-2">
          <div className="flex flex-1 flex-col gap-1.5 pt-3 pb-4 pl-4 opacity-[0.96] text-hs-neutral-0">
            <p className="font-sans text-sm leading-5 font-medium tracking-[-0.14px]">Orders</p>
            <p className="font-alumni text-7xl leading-[0.66] font-semibold tracking-[-0.72px]">
              {orders}
            </p>
          </div>
          <button
            type="button"
            className="mb-4 flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-hs-neutral-0"
            aria-label="Add"
          >
            <Plus className="size-5 text-hs-neutral-800" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
