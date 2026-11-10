import { Wallet } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { PageHeader } from "@/components/app/page-header";

export function MoneyPage() {
  return (
    <div className="fade-in-up">
      <PageHeader eyebrow="Indian Rupee · ₹" title="Money" />
      <EmptyState
        icon={Wallet}
        title="No transactions yet"
        description="Track spending, income and budgets in rupees. Your first entry will show up here."
      />
    </div>
  );
}
