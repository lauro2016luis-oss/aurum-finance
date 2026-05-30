"use client";

import { AlertTriangle, Clock } from "lucide-react";
import { upcomingBills } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function UpcomingBills() {
  const overdueCount = upcomingBills.filter((b) => b.status === "overdue").length;

  return (
    <div className="card-premium p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] text-[#52525B] uppercase tracking-[0.12em] mb-0.5">Próximas</p>
          <h3
            className="text-[16px] font-light text-white"
            style={{ fontFamily: "'Cormorant SC', serif" }}
          >
            Contas a Pagar
          </h3>
        </div>
        {overdueCount > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-[#EF4444] bg-error/10">
            <AlertTriangle size={11} />
            {overdueCount} vencida{overdueCount > 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {upcomingBills.map((bill, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-[#1A1A1A] last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: bill.status === "overdue" ? "#EF4444" : "#D4AF37",
                  boxShadow: bill.status === "overdue"
                    ? "0 0 6px rgba(239,68,68,0.6)"
                    : "0 0 6px rgba(212,175,55,0.4)",
                }}
              />
              <div>
                <p className="text-[12.5px] text-white leading-none">{bill.name}</p>
                <p className="text-[10.5px] text-[#3F3F46] mt-0.5 leading-none flex items-center gap-1">
                  <Clock size={9} />
                  {bill.dueDate}
                  {bill.status === "overdue" && (
                    <span className="text-[#EF4444] ml-1">Vencida</span>
                  )}
                </p>
              </div>
            </div>
            <span className="metric-value text-[13px] text-[#A1A1AA]">
              {formatCurrency(bill.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
