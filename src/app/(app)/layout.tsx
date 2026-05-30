import { NavProvider } from "@/lib/nav-context";
import { DataProvider } from "@/lib/data-store";
import { AppShell } from "@/components/layout/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <NavProvider>
        <AppShell>{children}</AppShell>
      </NavProvider>
    </DataProvider>
  );
}
